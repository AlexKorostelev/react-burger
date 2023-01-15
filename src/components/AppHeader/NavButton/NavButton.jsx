import navButtonStyles from './NavButton.module.css';
import PropTypes from "prop-types";

const NavButton = ({ children, text, isInactive }) => {
	const textClassName = `text text_type_main-default ml-2 ${isInactive ? "text_color_inactive" : ""}`;

	return (
		<nav className={`ml-5 mr-5 mb-4 mt-4 ${navButtonStyles.wrapper}`}>
			{children}
			<span  className={textClassName}>
				{text}
			</span>
		</nav>
	);
};

NavButton.propTypes = {
	text: PropTypes.string.isRequired,
	isInactive: PropTypes.bool,
	children: PropTypes.element
}

export default NavButton;
