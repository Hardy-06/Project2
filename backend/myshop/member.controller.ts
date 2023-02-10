import { MemberService } from "./member.service";
import { Request, Response, NextFunction } from "express";
import { getJWTPayload } from "../jwt";
import { MyShopService } from "./myshop.service";
import { HttpError } from "../http.error";

export class MemberController {
  constructor(
    public memberService: MemberService,
    public myShopService: MyShopService
  ) {}

  postMembersList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.body);
      let { input } = req.body;
      // console.log("data from controller", input);
      if (!input) {
        return res.status(400).json({
          status: false,
          message: "no userID received from member controller",
        });
      }

      let rows = await this.memberService.getMyshopService(input);
      // console.log("rows to controller", rows);
      return res
        .status(200)
        .json({ status: true, message: "able to fetch", rows: rows });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  getAddMemberData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // console.log(req.body);
      let { input } = req.body;
      // console.log("data from controller", input);
      if (!input) {
        return res.status(400).json({
          status: false,
          message: "no userID received from member controller",
        });
      }

      let rows = await this.memberService.getAddMemberData(input);
      // console.log("rows to controller", rows);
      return res
        .status(200)
        .json({ status: true, message: "able to fetch", rows: rows });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  addMember = async (req: Request, res: Response) => {
    try {
      let user_id = getJWTPayload(req).id;
      let shop_id = await this.myShopService.getShopID(user_id);
      let member_id = req.body.member;
      console.log(user_id, shop_id, member_id);
      if (!member_id || !user_id) throw new HttpError(400, "Invalid Action");
      let rows = await this.memberService.addMember(shop_id, member_id);
      // console.log("rows to controller", rows);
      return res
        .status(200)
        .json({ status: true, message: "able to fetch", rows: rows });
    } catch (error) {
      return res.status(400).json({ message: String(error) });
    }
  };
  getMemberDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user_id = getJWTPayload(req).id;
      let shop_id = await this.myShopService.getShopID(user_id);
      let member_id = +req.params.id;
      // console.log(member_id);
      if (!member_id) throw new HttpError(400, "invalid member_id");

      let json = await this.memberService.getMemberDetail({
        shop_id,
        member_id,
      });
      res.json(json);
    } catch (error) {
      next(error);
    }
  };

  getValidMemberPlan = async (req: Request, res: Response) => {
    try {
      let { id } = req.query;
      // console.log("data from controller123", { id });
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "no userID received from member controller",
        });
      }
      let rows = await this.memberService.getValidMemberPlan(+id);
      //   console.log("rows to controller", rows);
      return res
        .status(200)
        .json({ status: true, message: "able to fetch", result: rows });
    } catch (error) {
      // console.log(error);

      return res.status(400).json({ message: error });
    }
  };

  getInvalidMemberPlan = async (req: Request, res: Response) => {
    try {
      let { id } = req.query;
      // console.log("data from controller123", { id });
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "no userID received from member controller",
        });
      }
      let rows = await this.memberService.getInvalidMemberPlan(+id);
      // console.log("rows to controller Invalid", rows);
      return res
        .status(200)
        .json({ status: true, message: "able to fetch", result: rows });
    } catch (error) {
      // console.log(error);

      return res.status(400).json({ message: error });
    }
  };

  getShopPlanDetail = async (req: Request, res: Response) => {
    try {
      let { id } = req.query;
      // console.log("data from controller", { id });
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "no userID received from member controller",
        });
      }

      let rows = await this.memberService.getShopPlanDetail(+id);
      // console.log("rows", rows);
      // let shopPlanArray: any[] = [];
      // for (let i = 0; i < rows.length; i++) {
      let cancelPeriod = rows.shop_plan_cancel_period / (1000 * 60 * 60 * 24);
      let duePeriod = Math.floor(
        rows.shop_plan_due_period / (1000 * 60 * 60 * 24)
      );
      rows = { ...rows, cancelPeriod: cancelPeriod, duePeriod: duePeriod };

      // console.log("rows to controller getShopPlan", rows);
      return res.status(200).json({
        status: true,
        message: "able to fetch",
        result: rows,
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  postMemberSearch = async (req: Request, res: Response) => {
    let data = req.body;
    try {
      if (!data) {
        return res.status(400).json({
          status: false,
          message: "no data to search",
        });
      }
      let rows = await this.memberService.postMemberSearch(data);
      return res
        .status(200)
        .json({ status: true, message: "able to fetch", rows: rows });
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ status: false, message: "get nothing" });
    }
  };
}
