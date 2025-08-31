import ImageComponent from "../ImageComponent";

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockRendererFn = (block: any) => {
    if (block.getType() === "atomic") {
        return {
            component: ImageComponent,
            editable: false, // ảnh không editable như text
        };
    }
    return null;
};

export default blockRendererFn;