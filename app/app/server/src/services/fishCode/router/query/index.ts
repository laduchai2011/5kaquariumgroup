import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_Get_FishCodes from './handle/GetFishCodes';
import Handle_Get_FishCodesAccordingtoName from './handle/GetFishCodesAccordingtoName';
import Handle_Get_AFishCodeWithId from './handle/GetAFishCodeWithId';
import Handle_Get_AllFishCodesForFilter from './handle/GetAllFishCodesForFilter';



dotenv.config();
const router_query_fishCode: Router = express.Router();


const handle_get_aFishCodeWithId = new Handle_Get_AFishCodeWithId();
const handle_get_fishCodes = new Handle_Get_FishCodes();
const handle_get_fishCodesAccordingtoName = new Handle_Get_FishCodesAccordingtoName();
const handle_get_allFishCodesForFilter = new Handle_Get_AllFishCodesForFilter();



router_query_fishCode.get(
    '/getAFishCodeWithId',
    handle_get_aFishCodeWithId.main
);


router_query_fishCode.get(
    '/fishcodes',
    handle_get_fishCodes.main
);

router_query_fishCode.get(
    '/getFishcodesAccordingtoName',
    handle_get_fishCodesAccordingtoName.main
);

router_query_fishCode.get(
    '/getAllFishCodesForFilter',
    handle_get_allFishCodesForFilter.main
);





export default router_query_fishCode;
