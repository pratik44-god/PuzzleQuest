import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { huntService } from "../../services";
import { createHuntOutputModel, createHuntInputModel, uploadImageInputModel, uploadImageOutputModel, createHuntQuestionsInputModel, createHuntQuestionsOutputModel, getHuntByIdInputModel, getHuntByIdOutputModel, getHuntQuestionByIdOutputModel, getHuntQuestionByIdInputModel, deleteHuntByIdInputModel, deleteHuntByIdOutputModel, deleteHuntQuestionsByIdOutputModel, deleteHuntQuestionsByIdInputModel, updateHuntQuestionByIdAndIndexInputModel, updateHuntQuestionByIdAndIndexOutputModel, getPublishedHuntsOutputModel, getMyHuntsOutputModel, updateHuntStatusInputModel, updateHuntStatusOutputModel, updateHuntTagInputModel, updateHuntTagOutputModel, recordHuntPlayInputModel, recordHuntPlayOutputModel, verifyAnswerInputModel, verifyAnswerOutputModel, recordHuntCompletionInputModel, recordHuntCompletionOutputModel, getLeaderboardOutputModel } from "./model";
// import { verifyAnswerInput } from "@repo/services/hunt/model";

const TAGS = ["Authentication"];

const getPath = generatePath("/authentication");


export const huntRouter = router({

    createHunt: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath("/create-hunt"),
                tags: TAGS,
                protect: true
            }
        })
        .input(createHuntInputModel)
        .output(createHuntOutputModel)
        .mutation(async ({ ctx, input }) => {

            const { title, description, image, difficulty } = input
            const creatorsId = ctx.user.id; // Assuming you have the user ID in the context
            const { id } = await huntService.createHunt({ title, description, image, difficulty, creatorsId })

            return {
                id
            }
        }),


        uploadImage: authenticatedProcedure
            .meta({openapi: {
                method: "POST",
                path: getPath("/upload-image"),
                tags: TAGS,
                protect: true
            }})
            .input(uploadImageInputModel)
            .output(uploadImageOutputModel)
            .mutation(async ({ctx, input }) => {
              const imageUrl = await huntService.uploadImage(
                input.image
              );
        
              return {
                imageUrl,
              };
            }),

    createHuntQuestions: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath("/create-hunt-questions"),
                tags: TAGS,
                protect: true
            }
        })
        .input(createHuntQuestionsInputModel)
        .output(createHuntQuestionsOutputModel)
        .mutation(async ({ ctx, input }) => {

            const { questionType, question, answer, hints, huntId } = input

            // if(hints?.length === 3) throw new Error(`Max limit is 3`)

            const { id } = await huntService.createHuntQuestions({ questionType, question, answer, hints, huntId })

            return {
                id
            }

        }),

        getHuntById: authenticatedProcedure
        .meta({openapi:{
            method: "GET",
            path: getPath("/getHuntById"),
            tags: TAGS,
            protect: true
        }})
        .input(getHuntByIdInputModel)
        .output(getHuntByIdOutputModel)
        .query(async ({input}) => {
            const {id} = input
            const hunt = await huntService.getHuntById(id)
            return hunt
            
        }),

        getPublishedHunts: authenticatedProcedure
        .meta({openapi:{
            method: "GET",
            path: getPath("/getPublishedHunts"),
            tags: TAGS,
            protect: true
        }})
        .output(getPublishedHuntsOutputModel)
        .query(async () => {
            return huntService.getPublishedHunts()
        }),

        getMyHunts: authenticatedProcedure
        .meta({openapi:{
            method: "GET",
            path: getPath("/getMyHunts"),
            tags: TAGS,
            protect: true
        }})
        .output(getMyHuntsOutputModel)
        .query(async ({ ctx }) => {
            return huntService.getMyHunts(ctx.user.id)
        }),

        updateHuntStatus: authenticatedProcedure
        .meta({openapi:{
            method: "PUT",
            path: getPath("/updateHuntStatus"),
            tags: TAGS,
            protect: true
        }})
        .input(updateHuntStatusInputModel)
        .output(updateHuntStatusOutputModel)
        .mutation(async ({ ctx, input }) => {
            return huntService.updateHuntStatus(input, ctx.user.id)
        }),

        updateHuntTag: authenticatedProcedure
        .meta({openapi:{
            method: "PUT",
            path: getPath("/updateHuntTag"),
            tags: TAGS,
            protect: true
        }})
        .input(updateHuntTagInputModel)
        .output(updateHuntTagOutputModel)
        .mutation(async ({ ctx, input }) => {
            return huntService.updateHuntTag(input, ctx.user.id)
        }),

        recordHuntPlay: authenticatedProcedure
        .meta({openapi:{
            method: "POST",
            path: getPath("/recordHuntPlay"),
            tags: TAGS,
            protect: true
        }})
        .input(recordHuntPlayInputModel)
        .output(recordHuntPlayOutputModel)
        .mutation(async ({ input }) => {
            return huntService.recordHuntPlay(input.id)
        }),


        getHuntQuestionById: authenticatedProcedure
        .meta({openapi:{    
            method: "GET",
            path: getPath("/getHuntQuestionById"),
            tags: TAGS,
            protect: true
        }})
        .input(getHuntQuestionByIdInputModel)
        .output(getHuntQuestionByIdOutputModel)
        .query(async ({input}) => {
            const {id} = input
            const huntQuestions = await huntService.getHuntQuestionsById(id)
            return huntQuestions
        }),

        deleteHuntById: authenticatedProcedure
        .meta({openapi:{
            method: "DELETE",   
            path: getPath("/deleteHuntById"),
            tags: TAGS,
            protect: true
        }})
        .input(deleteHuntByIdInputModel)
        .output(deleteHuntByIdOutputModel)
        .mutation(async ({ ctx, input }) => {
            const {id} = input
            const hunt = await huntService.deleteHuntById(id, ctx.user.id)
            return hunt
            
        }),

        deleteHuntQuestionsById: authenticatedProcedure
        .meta({openapi:{
            method: "DELETE",   
            path: getPath("/deleteHuntQuestionsById"),
            tags: TAGS,
            protect: true
        }})
        .input(deleteHuntQuestionsByIdInputModel)
        .output(deleteHuntQuestionsByIdOutputModel)
        .mutation(async ({input}) => {
            const {huntId, questionIndex} = input
            console.log(huntId, questionIndex)
            const huntQuestions = await huntService.deleteHuntQuestionById(huntId, questionIndex)
            return huntQuestions
            
        }),

        updateHuntQuestionByIdAndIndex: authenticatedProcedure
        .meta({openapi:{
            method: "PUT",
            path: getPath("/updateHuntQuestionByIdAndIndex"),
            tags: TAGS,
            protect: true
        }})
        .input(updateHuntQuestionByIdAndIndexInputModel)
        .output(updateHuntQuestionByIdAndIndexOutputModel)
        .mutation(async ({input}) => {
            const {huntId, questionIndex, questionType, question, answer, hints} = input
            const huntQuestions = await huntService.updateHuntQuestionByIdAndIndex({huntId, questionIndex, questionType, question, answer, hints})
            return huntQuestions
}),

        verifyAnswer: authenticatedProcedure
        .meta({openapi:{
            method: "GET",
            path: getPath("/verifyAnswer"),
            tags: TAGS,
            protect: true
        }})
        .input(verifyAnswerInputModel)
        .output(verifyAnswerOutputModel)
        .mutation(async ({input}) => {
            const {answer, huntId, questionIndex} = input
            const verifyAnswer = await huntService.verifyAnswer({answer, huntId, questionIndex})
            return verifyAnswer
            
}),

        recordHuntCompletion: authenticatedProcedure
        .meta({openapi:{
            method: "POST",
            path: getPath("/recordHuntCompletion"),
            tags: TAGS,
            protect: true
        }})
        .input(recordHuntCompletionInputModel)
        .output(recordHuntCompletionOutputModel)
        .mutation(async ({ ctx, input }) => {
            return huntService.recordHuntCompletion(input, ctx.user.id)
        }),

        getLeaderboard: authenticatedProcedure
        .meta({openapi:{
            method: "GET",
            path: getPath("/getLeaderboard"),
            tags: TAGS,
            protect: true
        }})
        .output(getLeaderboardOutputModel)
        .query(async ({ ctx }) => {
            return huntService.getLeaderboard(ctx.user.id)
        }),

});
