import { request, response } from "express";
import { runLighthouseAudit } from "../config/lighthouse.mjs";
import { runPlaywrightTest } from "../config/playwright.mjs";
import CustomError from "../config/errors.mjs";
import EvaluationModel from "../database/models/inspectia/evaluation.model.mjs";

class EvaluationController {
  static #handleError(error, res = response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        status: false,
        data: null,
        error: {
          code: error.code,
          message: error.message,
          description: error.description,
        },
      });
    }
    console.error(error);
    return res.status(500).json({
      status: false,
      data: null,
      error: {
        code: "ES5000",
        message: "Internal Server Error",
        description:
          error.message ||
          "An uncontrolled error has occurred in the inspectia server.",
      },
    });
  }

  static evaluateSite = async (req = request, res = response) => {
    const { url, name, description } = req.body;

    try {
      const lighthouseData = await runLighthouseAudit(url);
      const playwrightData = await runPlaywrightTest(url);

      const page = await EvaluationModel.createPage(name, description);
      const pageId = Number(page.id);

      const data = {
        url,
        performance: lighthouseData.performance,
        accessibility: lighthouseData.accessibility,
        best_practices: lighthouseData.best_practices,
        seo: lighthouseData.seo,
        overall_score: lighthouseData.overall_score,
        load_time_ms: playwrightData.loadTime || null,
        page_title: playwrightData.title || null,
        playwright_success: playwrightData.success || false,
        id_pagina: Number(pageId),
      };

      const result = await EvaluationModel.create(data);

      return res.status(200).json({
        status: true,
        data: {
          id: result.id,
          ...lighthouseData,
          playwright: playwrightData,
        },
        error: null,
      });
    } catch (error) {
      console.log(error);
      this.#handleError(error, res);
    }
  };

  static getResult = async (req = request, res = response) => {
    try {
      const data = await EvaluationModel.findAll();

      if (!data || data.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json({
        status: true,
        data,
        error: null,
      });
    } catch (error) {
      console.log(error);
      this.#handleError(error, res);
    }
  };
}

export default EvaluationController;
