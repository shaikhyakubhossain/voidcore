import type { Request, Response } from "express";

import { getModels, getProviders } from "../services/llm/llm.service.js";
import { createErrorResponse } from "../dto/common.dto.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { AIProviderError } from "../errors/AIProviderError.js";

export async function listProviders(_req: Request, res: Response) {
  try {
    const providers = await getProviders();

    return res.json({
      success: true,
      data: providers,
    });
  } catch (error) {
    if (error instanceof AIProviderError) {
      return res
        .status(error.status)
        .json(createErrorResponse(error.code, error.message));
    }

    return res
      .status(500)
      .json(
        createErrorResponse(
          ErrorCode.INTERNAL_SERVER_ERROR,
          "Failed to fetch providers.",
        ),
      );
  }
}

export async function listModels(_req: Request, res: Response) {
  try {
    const models = await getModels();

    return res.json({
      success: true,
      data: models,
    });
  } catch (error) {
    if (error instanceof AIProviderError) {
      return res
        .status(error.status)
        .json(createErrorResponse(error.code, error.message));
    }

    return res
      .status(500)
      .json(
        createErrorResponse(
          ErrorCode.INTERNAL_SERVER_ERROR,
          "Failed to fetch models.",
        ),
      );
  }
}
