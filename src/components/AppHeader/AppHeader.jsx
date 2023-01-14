import {BurgerIcon, ListIcon, ProfileIcon, Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './AppHeader.module.css';
import NavButton from "./NavButton/NavButton";

const AppHeader = () => (
	<header className={headerStyles.wrapper}>
		<div className={headerStyles.blocks_container}>
			<div className={headerStyles.block_left}>
				<NavButton text="Конструктор">
					<BurgerIcon type="primary" />
				</NavButton>
				<div className={headerStyles.buttons_separator} />
				<NavButton text="Лента заказов" isInactive={true}>
					<ListIcon type="primary" />
				</NavButton>
			</div>
			<div className={headerStyles.block_center}>
				<Logo/>
			</div>
			<div className={headerStyles.block_right}>
				<NavButton text="Личный кабинет" isInactive={true}>
					<ProfileIcon type="primary" />
				</NavButton>
			</div>
		</div>
	</header>
);

export default AppHeader;
