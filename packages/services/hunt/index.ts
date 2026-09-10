import {and, asc, db, desc, eq, max, sql, type SQL} from "@repo/database";
import { createHuntInput, CreateHuntInputType, createHuntQuestionsInput, CreateHuntQuestionsInputType, RecordHuntCompletionInputType, recordHuntCompletionInput, UpdateHuntQuestionByIdAndIndexType, updateHuntStatusInput, UpdateHuntStatusInputType, updateHuntTagInput, UpdateHuntTagInputType, VerifyAnswerInputType } from "./model";
import { huntCompletionsTable, huntsQuestionTable, huntsTable, usersTable } from "@repo/database/schema";
import { calculateHuntReward, getHighestBadge, getUniqueBadges } from "./rewards";

import { v2 as cloudinary } from "cloudinary";
import { env } from "../env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: env.CLOUDINARY_CLOUD_SECRET_KEY,
});

class HuntService{


    private async getNextIndex(huntId: string): Promise<number> {
        const result = await db
            .select({ maxIndex: max(huntsQuestionTable.questionIndex) })
            .from(huntsQuestionTable)
            .where(eq(huntsQuestionTable.huntId, huntId))

        const current = result[0]?.maxIndex
        const next = current !== null && current !== undefined
        ? Number(current) + 1
        : 0;
        return next;
    }

    public async createHunt(payload: CreateHuntInputType) {
        const {title, description, image, difficulty, creatorsId} = await createHuntInput.parseAsync(payload)

        const result = await db.insert(huntsTable).values({title, description, image, difficulty, creatorsId}).returning({
            id: huntsTable.id
        })

        if(!result || result.length === 0 || !result[0]?.id) throw new Error(`something went wrong while creating the hunt`)

        return{
            id: result[0].id
        }
    }


  public async uploadImage(
    image: string,
  ): Promise<string> {
    const result =
      await cloudinary.uploader.upload(image, {
        folder: "puzzlequest/hunts",
        resource_type: "image",
      });

    return result.secure_url;
  }

  public async createHuntQuestions(payload: CreateHuntQuestionsInputType) {

    
    const {questionType, question, questionText, answer, hints, huntId, timeLimitSeconds} = await createHuntQuestionsInput.parseAsync(payload)

    const index = await this.getNextIndex(huntId)
   
    const result = await db.insert(huntsQuestionTable).values({questionType, question, questionText, answer, hints, huntId, questionIndex: index, timeLimitSeconds: timeLimitSeconds ?? null}).returning({
        id: huntsQuestionTable.id
    })
    
    if(!result || result.length === 0 || !result[0]?.id) throw new Error(`something went wrong while creating the hunt question`) 

    return{
      id: result[0].id
    }

}

  public async getHuntById(id: string){
    const hunt = await db.select({
       id: huntsTable.id,
       title: huntsTable.title, 
       description: huntsTable.description, 
       image: huntsTable.image, 
       difficulty: huntsTable.difficulty,
       status: huntsTable.status,
       tag: huntsTable.tag,
       createdAt: huntsTable.createdAt
       })
    .from(huntsTable)
    .where(eq(huntsTable.id, id))


    if(!hunt || hunt.length === 0) throw new Error(`Hunt with ID: ${id} does not exists`)

    return hunt[0]!
  }

  private listHuntsWithStats(whereClause: SQL) {
    return db
      .select({
        id: huntsTable.id,
        title: huntsTable.title,
        description: huntsTable.description,
        image: huntsTable.image,
        difficulty: huntsTable.difficulty,
        status: huntsTable.status,
        tag: huntsTable.tag,
        playCount: huntsTable.playCount,
        createdAt: huntsTable.createdAt,
        creatorId: huntsTable.creatorsId,
        creatorName: usersTable.fullName,
        creatorEmail: usersTable.email,
        creatorAvatar: usersTable.profileImageUrl,
        questionCount: sql<number>`(
          select cast(count(*) as int)
          from ${huntsQuestionTable}
          where ${huntsQuestionTable.huntId} = ${huntsTable.id}
        )`.mapWith(Number),
        hintCount: sql<number>`(
          select cast(
            coalesce(
              sum(coalesce(array_length(${huntsQuestionTable.hints}, 1), 0)),
              0
            ) as int
          )
          from ${huntsQuestionTable}
          where ${huntsQuestionTable.huntId} = ${huntsTable.id}
        )`.mapWith(Number),
      })
      .from(huntsTable)
      .leftJoin(usersTable, eq(huntsTable.creatorsId, usersTable.id))
      .where(whereClause)
      .orderBy(desc(huntsTable.createdAt));
  }

  public async getPublishedHunts() {
    return this.listHuntsWithStats(eq(huntsTable.status, "PUBLISHED"));
  }

  public async getMyHunts(creatorsId: string) {
    return this.listHuntsWithStats(eq(huntsTable.creatorsId, creatorsId));
  }

  public async updateHuntStatus(
    payload: UpdateHuntStatusInputType,
    creatorsId: string,
  ) {
    const { id, status } = await updateHuntStatusInput.parseAsync(payload);

    const result = await db
      .update(huntsTable)
      .set({ status })
      .where(
        and(
          eq(huntsTable.id, id),
          eq(huntsTable.creatorsId, creatorsId),
        ),
      )
      .returning({ id: huntsTable.id, status: huntsTable.status });

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error(`Hunt with ID: ${id} does not exist or you do not have permission`);
    }

    return result[0];
  }

  public async updateHuntTag(
    payload: UpdateHuntTagInputType,
    creatorsId: string,
  ) {
    const { id, tag } = await updateHuntTagInput.parseAsync(payload);

    const result = await db
      .update(huntsTable)
      .set({ tag })
      .where(
        and(
          eq(huntsTable.id, id),
          eq(huntsTable.creatorsId, creatorsId),
        ),
      )
      .returning({ id: huntsTable.id, tag: huntsTable.tag });

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error(`Hunt with ID: ${id} does not exist or you do not have permission`);
    }

    return result[0];
  }

  public async recordHuntPlay(huntId: string) {
    const result = await db
      .update(huntsTable)
      .set({
        playCount: sql`coalesce(${huntsTable.playCount}, 0) + 1`,
      })
      .where(eq(huntsTable.id, huntId))
      .returning({
        id: huntsTable.id,
        playCount: huntsTable.playCount,
      });

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error(`Hunt with ID: ${huntId} does not exist`);
    }

    return result[0];
  }

  public async getHuntQuestionsById(huntId: string){
    const huntQuestions = await db.select({
       questionType: huntsQuestionTable.questionType, 
       question: huntsQuestionTable.question,
       questionText: huntsQuestionTable.questionText,
       answer: huntsQuestionTable.answer, 
       hints: huntsQuestionTable.hints, 
       createdAt: huntsQuestionTable.createdAt,
       questionIndex: huntsQuestionTable.questionIndex,
       timeLimitSeconds: huntsQuestionTable.timeLimitSeconds,
       })
    .from(huntsQuestionTable)
    .where(eq(huntsQuestionTable.huntId, huntId))
    .orderBy(asc(huntsQuestionTable.questionIndex))


    // if(huntQuestions.length === 0) throw new Error(`Hunt questions with ID: ${huntId} does not exists`)

    return huntQuestions
  }
  public async deleteHuntById(id: string, creatorsId: string) {
    const existing = await db
      .select({ id: huntsTable.id })
      .from(huntsTable)
      .where(
        and(
          eq(huntsTable.id, id),
          eq(huntsTable.creatorsId, creatorsId),
        ),
      );

    if (!existing.length || !existing[0]?.id) {
      throw new Error(
        `Hunt with ID: ${id} does not exist or you do not have permission`,
      );
    }

    await db
      .delete(huntsQuestionTable)
      .where(eq(huntsQuestionTable.huntId, id));

    const hunt = await db
      .delete(huntsTable)
      .where(
        and(
          eq(huntsTable.id, id),
          eq(huntsTable.creatorsId, creatorsId),
        ),
      )
      .returning({
        id: huntsTable.id,
      });

    if (!hunt || hunt.length === 0 || !hunt[0]?.id) {
      throw new Error(
        `Hunt with ID: ${id} does not exist or you do not have permission`,
      );
    }

    return {
      id: hunt[0].id,
    };
  }
  public async deleteHuntQuestionById(huntId: string, questionIndex:number){
    const huntQuestion = await db.delete(huntsQuestionTable).where(and(
      eq(huntsQuestionTable.huntId, huntId),
      eq(huntsQuestionTable.questionIndex, questionIndex),
    ),).returning({
    huntId: huntsQuestionTable.huntId
    })
    if(!huntQuestion || huntQuestion.length === 0 || !huntQuestion[0]?.huntId) throw new Error(`HuntQuestion with ID: ${huntId} is not exists`)
      // console.log(huntQuestion[0])
    return{
      huntId: huntQuestion[0].huntId
    }
  }


  public async updateHuntQuestionByIdAndIndex(payload: UpdateHuntQuestionByIdAndIndexType){

    const huntQuestion = await db.update(huntsQuestionTable).set({
      question: payload.question,
      questionText:
        payload.questionType === "IMAGE"
          ? payload.questionText?.trim() || null
          : null,
      answer: payload.answer,
      hints: payload.hints,
      questionType: payload.questionType,
      timeLimitSeconds:
        payload.timeLimitSeconds !== undefined
          ? payload.timeLimitSeconds
          : undefined,
    })
    .where(and(
      eq(huntsQuestionTable.huntId, payload.huntId),
      eq(huntsQuestionTable.questionIndex, payload.questionIndex),
    ))
    .returning({
      huntId: huntsQuestionTable.huntId
    })

    if(!huntQuestion || huntQuestion.length === 0 || !huntQuestion[0]?.huntId) throw new Error(`HuntQuestion with ID: ${payload.huntId} is not exists`)

    return{
      huntId: huntQuestion[0].huntId
    }
  }

  public async verifyAnswer(payload: VerifyAnswerInputType) {
    const result = await db
      .select({ answer: huntsQuestionTable.answer })
      .from(huntsQuestionTable)
      .where(
        and(
          eq(huntsQuestionTable.huntId, payload.huntId),
          eq(huntsQuestionTable.questionIndex, payload.questionIndex),
        ),
      );

    const verifyAns = result[0]?.answer;

    if (!verifyAns || !verifyAns.trim()) {
      throw new Error("The ans is not valid");
    }

    if (
      verifyAns.trim().toLowerCase() !==
      payload.answer.trim().toLowerCase()
    ) {
      throw new Error("Answer is incorrect");
    }

    return {
      verifyAns,
    };
  }

  public async recordHuntCompletion(
    payload: RecordHuntCompletionInputType,
    userId: string,
  ) {
    const { huntId, questionCount } =
      await recordHuntCompletionInput.parseAsync(payload);

    const hunt = await db
      .select({
        id: huntsTable.id,
        difficulty: huntsTable.difficulty,
        status: huntsTable.status,
      })
      .from(huntsTable)
      .where(eq(huntsTable.id, huntId));

    if (!hunt[0]?.id) {
      throw new Error(`Hunt with ID: ${huntId} does not exist`);
    }

    if (hunt[0].status !== "PUBLISHED") {
      throw new Error("Only published hunts can be completed");
    }

    const reward = calculateHuntReward(
      hunt[0].difficulty,
      questionCount,
    );

    const [completion] = await db
      .insert(huntCompletionsTable)
      .values({
        userId,
        huntId,
        score: reward.score,
        xpEarned: reward.xpEarned,
        badge: reward.badge,
        questionCount,
      })
      .returning({
        id: huntCompletionsTable.id,
        score: huntCompletionsTable.score,
        xpEarned: huntCompletionsTable.xpEarned,
        badge: huntCompletionsTable.badge,
        questionCount: huntCompletionsTable.questionCount,
      });

    if (!completion?.id) {
      throw new Error("Failed to record hunt completion");
    }

    const [playerStats] = await db
      .select({
        totalXp: sql<number>`coalesce(sum(${huntCompletionsTable.xpEarned}), 0)`.mapWith(
          Number,
        ),
        huntsCompleted: sql<number>`count(*)`.mapWith(Number),
      })
      .from(huntCompletionsTable)
      .where(eq(huntCompletionsTable.userId, userId));

    return {
      ...completion,
      totalXp: playerStats?.totalXp ?? reward.xpEarned,
      huntsCompleted: playerStats?.huntsCompleted ?? 1,
    };
  }

  public async getLeaderboard(currentUserId?: string) {
    const leaderboardRows = await db
      .select({
        userId: huntCompletionsTable.userId,
        totalXp: sql<number>`coalesce(sum(${huntCompletionsTable.xpEarned}), 0)`.mapWith(
          Number,
        ),
        huntsCompleted: sql<number>`count(*)`.mapWith(Number),
        fullName: usersTable.fullName,
        email: usersTable.email,
        profileImageUrl: usersTable.profileImageUrl,
      })
      .from(huntCompletionsTable)
      .innerJoin(usersTable, eq(huntCompletionsTable.userId, usersTable.id))
      .groupBy(
        huntCompletionsTable.userId,
        usersTable.fullName,
        usersTable.email,
        usersTable.profileImageUrl,
      )
      .orderBy(desc(sql`sum(${huntCompletionsTable.xpEarned})`))
      .limit(50);

    const latestBadges = await db
      .select({
        userId: huntCompletionsTable.userId,
        badge: huntCompletionsTable.badge,
      })
      .from(huntCompletionsTable);

    const badgesByUser = new Map<string, (typeof latestBadges)[number]["badge"][]>();

    for (const row of latestBadges) {
      const existing = badgesByUser.get(row.userId) ?? [];
      existing.push(row.badge);
      badgesByUser.set(row.userId, existing);
    }

    const players = leaderboardRows.map((row, index) => {
      const earnedBadges = badgesByUser.get(row.userId) ?? [];
      const badges = getUniqueBadges(earnedBadges);

      return {
        rank: index + 1,
        userId: row.userId,
        name: row.fullName,
        email: row.email,
        avatar: row.profileImageUrl,
        totalXp: row.totalXp,
        huntsCompleted: row.huntsCompleted,
        badge: getHighestBadge(earnedBadges),
        badges,
      };
    });

    let currentPlayer = null as null | (typeof players)[number];

    if (currentUserId) {
      currentPlayer =
        players.find((player) => player.userId === currentUserId) ?? null;

      if (!currentPlayer) {
        const [stats] = await db
          .select({
            totalXp: sql<number>`coalesce(sum(${huntCompletionsTable.xpEarned}), 0)`.mapWith(
              Number,
            ),
            huntsCompleted: sql<number>`count(*)`.mapWith(Number),
            fullName: usersTable.fullName,
            email: usersTable.email,
            profileImageUrl: usersTable.profileImageUrl,
          })
          .from(huntCompletionsTable)
          .innerJoin(usersTable, eq(huntCompletionsTable.userId, usersTable.id))
          .where(eq(huntCompletionsTable.userId, currentUserId))
          .groupBy(
            usersTable.fullName,
            usersTable.email,
            usersTable.profileImageUrl,
          );

        if (stats && stats.huntsCompleted > 0) {
          const allTotals = await db
            .select({
              userId: huntCompletionsTable.userId,
              totalXp: sql<number>`coalesce(sum(${huntCompletionsTable.xpEarned}), 0)`.mapWith(
                Number,
              ),
            })
            .from(huntCompletionsTable)
            .groupBy(huntCompletionsTable.userId)
            .orderBy(desc(sql`sum(${huntCompletionsTable.xpEarned})`));

          const rankIndex = allTotals.findIndex(
            (row) => row.userId === currentUserId,
          );

          currentPlayer = {
            rank: rankIndex === -1 ? allTotals.length + 1 : rankIndex + 1,
            userId: currentUserId,
            name: stats.fullName,
            email: stats.email,
            avatar: stats.profileImageUrl,
            totalXp: stats.totalXp,
            huntsCompleted: stats.huntsCompleted,
            badge: getHighestBadge(badgesByUser.get(currentUserId) ?? []),
            badges: getUniqueBadges(badgesByUser.get(currentUserId) ?? []),
          };
        }
      }
    }

    return {
      players,
      currentPlayer,
    };
  }
}
export default HuntService