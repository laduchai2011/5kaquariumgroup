 // eslint-disable-next-line @typescript-eslint/no-explicit-any
const ImageComponent = (props: any) => {
    const { block, contentState } = props;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src } = entity.getData();

    return (
        <div style={{ textAlign: "center", margin: "10px 0" }}>
        <img src={src} alt="inserted" style={{ maxWidth: "100%" }} />
        </div>
    );
};

export default ImageComponent;