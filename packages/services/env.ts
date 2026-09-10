import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET : z.string().describe("Secret Key of jwt token"),

  GOOGLE_OAUTH_CLIENT_ID: z.string(),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
  GOOGLE_OAUTH_REDIRECT_URI: z.string(),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_CLOUD_API_KEY: z.string(),
  CLOUDINARY_CLOUD_SECRET_KEY: z.string(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) throw new Error(safeParseResult.error.message);
  return safeParseResult.data;
}

export const env = createEnv(process.env);

