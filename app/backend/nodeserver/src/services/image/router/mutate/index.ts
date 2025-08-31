import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_UploadAImage from './handle/UploadAImage';

dotenv.config();

const router_mutate_image: Router = express.Router();
const handle_uploadAImage = new Handle_UploadAImage();


router_mutate_image.post(
    '/uploadAImage',
    handle_uploadAImage.upload().single("image"),
    handle_uploadAImage.main
);

export default router_mutate_image;
