import { Router } from "express";

import {
  listModels,
  listProviders,
} from "../controllers/llm.controller.js";

const router = Router();

router.get("/providers", listProviders);
router.get("/models", listModels);

export default router;