import deleteSvg from "../../assets/icons/delete.svg";

const Item = ({
  src = "",
  local = false,
  onDelete = () => {},
  ...otherProps
}) => {
  return (
    <div className="item" {...otherProps}>
      <div className={`content ${local && "local"}`}>
        {local && (
          <div className="delete" onClick={onDelete}>
            <img src={deleteSvg} alt="delete icon" />
          </div>
        )}
        <img
          src={src}
          alt="some photography item"
          className="portfolio__preview"
        />
      </div>
    </div>
  );
};

export default Item;
