import {Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './AppHeader.module.css';
import NavButton from "./NavButton/NavButton";

const AppHeader = () => (
	<header className={headerStyles.wrapper}>
		<div className={headerStyles.blocks_container}>
			<div className={headerStyles.block_left}>
				<NavButton text="Конструктор" icon="BurgerIcon" linkTo={"/"} />
				<div className={headerStyles.buttons_separator} />
				<NavButton text="Лента заказов" icon="ListIcon" linkTo={"/order"} />
			</div>
			<div className={headerStyles.block_center}>
				<Logo/>
			</div>
			<div className={headerStyles.block_right}>
				<NavButton text="Личный кабинет" icon="ProfileIcon" linkTo={"/profile"} />
			</div>
		</div>
	</header>
);

export default AppHeader;
