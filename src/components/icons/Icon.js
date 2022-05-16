const IconContainer = ({ title, onClick, Icon }) => (
  <div aria-label={title} title={title} onClick={onClick} style={{ cursor: 'pointer' }}>
    <Icon />
  </div>
);

export default IconContainer;
