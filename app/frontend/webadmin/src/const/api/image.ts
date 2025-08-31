const BASE_URL = import.meta.env.VITE_API_URL || 'http://172.19.224.1:3006';

export const IMAGE_API = {
    GET_IMAGE: `${BASE_URL}/api/service_image/query/image`,
    UPLOAD_AIMAGE: `${BASE_URL}/api/service_image/mutate/uploadAImage`,
}