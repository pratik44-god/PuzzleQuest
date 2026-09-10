"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProtectedLink from "~/components/auth/ProtectedLink";
import { useUpdateHuntStatus } from "~/hooks/api/hunt";
import type { Hunt } from "~/components/discover/discover-hunts";

// import "./hunt-card.css";

type HuntCardProps = {
  hunt: Hunt;
  variant?: "draft" | "published";
  index?: number;
  showActions?: boolean;
};

const difficultyClass = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
} as const;

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z" />
    </svg>
  );
}

export default function HuntCard({
  hunt,
  variant = "published",
  index = 0,
  showActions = true,
}: HuntCardProps) {
  const router = useRouter();
  const { updateHuntStatusAsync } = useUpdateHuntStatus();
  const [saved, setSaved] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const questionLabel =
    hunt.questionCount === 1
      ? "1 Question"
      : `${hunt.questionCount} Questions`;

  const playLabel =
    hunt.playCount === 1 ? "1 Play" : `${hunt.playCount} Plays`;

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await updateHuntStatusAsync({
        id: hunt.id,
        status: "PUBLISHED",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to publish hunt:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const card = (
    <article
      className={`hunt-card-wrap animate-[huntReveal_0.65s_ease-out_both]${variant === "draft" ? " hunt-card-wrap--draft" : ""}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className={`hunt-card${variant === "draft" ? " hunt-card--draft" : ""}`}>
        <div className="hunt-cover">
          {hunt.image ? (
            <>
              <img
                src={hunt.image}
                alt=""
                aria-hidden="true"
                className="hunt-cover-bg"
              />
              <img
                src={hunt.image}
                alt={hunt.title}
                className="hunt-cover-img"
              />
            </>
          ) : (
            <div
              className={`hunt-cover-fallback bg-gradient-to-br ${hunt.accent}`}
            >
              {hunt.icon ?? "🗺️"}
            </div>
          )}

          {variant === "draft" ? (
            <span className="hunt-status-badge">Draft</span>
          ) : null}

          <button
            type="button"
            className={`bookmark${saved ? " bookmark--saved" : ""}`}
            aria-label={saved ? "Remove bookmark" : "Bookmark"}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSaved((value) => !value);
            }}
          >
            <BookmarkIcon />
          </button>
        </div>

        <div className="hunt-content">
          <div className="hunt-heading">
            <div className="hunt-icon">
              <span>✚</span>
            </div>

            <div className="hunt-title-area">
              <h3>{hunt.title}</h3>
              <p>
                {hunt.description || "No description yet."}
              </p>
            </div>
          </div>

          <div className="hunt-stats">
            <span
              className={`difficulty ${difficultyClass[hunt.difficulty]}`}
            >
              <span className="bars">▮▮▮</span>
              {hunt.difficulty}
            </span>

            <span className="stat">
              <span className="stat-icon">✚</span>
              {questionLabel}
            </span>

            <span className="stat">
              <span className="people-icon">♧</span>
              {playLabel}
            </span>
          </div>

          {showActions ? (
            <div className="hunt-footer">
              <div className="hunt-footer-row">
                <div className="creator">
                  <div className="avatar">
                    {hunt.creatorAvatar ? (
                      <img
                        src={hunt.creatorAvatar}
                        alt={hunt.creatorHandle}
                      />
                    ) : null}
                  </div>
                  <span>{hunt.creatorHandle}</span>
                </div>
              </div>

              {variant === "draft" ? (
                <div className="hunt-footer-actions">
                  <ProtectedLink
                    href={`/dashboard/create/${hunt.id}/question`}
                    className="secondary-btn"
                  >
                    Edit
                  </ProtectedLink>

                  <ProtectedLink
                    href={`/dashboard/hunts/${hunt.id}`}
                    className="secondary-btn"
                  >
                    View
                  </ProtectedLink>

                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="publish-btn"
                  >
                    {isPublishing ? "Publishing…" : "Publish"}
                  </button>
                </div>
              ) : (
                <div className="hunt-footer-actions">
                  <ProtectedLink
                    href={`/dashboard/hunts/${hunt.id}`}
                    className="secondary-btn"
                  >
                    View
                  </ProtectedLink>

                  <ProtectedLink
                    href={`/hunts/${hunt.id}`}
                    className="publish-btn"
                  >
                    <span className="play">▶</span>
                    Start Hunt
                  </ProtectedLink>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );

  if (variant === "published" && !showActions) {
    return (
      <ProtectedLink
        href={`/discover/${hunt.id}`}
        className="block h-full"
      >
        {card}
      </ProtectedLink>
    );
  }

  return card;
}
