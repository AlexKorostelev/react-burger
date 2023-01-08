import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import bodyStyles from "./App.module.css"
import {mockData} from "../../utils/data";

const App = () => {
    return (
        <>
            <AppHeader />
            <main className={bodyStyles.wrapper}>
                <BurgerIngredients cards={mockData} />
                <div className={bodyStyles.separator} />
                <BurgerConstructor cards={mockData} />
            </main>
        </>
    )
}

export default App;
