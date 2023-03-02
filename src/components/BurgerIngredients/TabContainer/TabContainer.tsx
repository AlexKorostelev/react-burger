import { Dispatch, FC, SetStateAction } from 'react';
import styles from './TabContainer.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabs } from '../../../utils/constants';

interface ITabContainerProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const TabContainer: FC<ITabContainerProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tab_container}>
      <Tab
        value={tabs.bun}
        active={activeTab === tabs.bun}
        onClick={setActiveTab}
      >
        {tabs.bun}
      </Tab>
      <Tab
        value={tabs.sauce}
        active={activeTab === tabs.sauce}
        onClick={setActiveTab}
      >
        {tabs.sauce}
      </Tab>
      <Tab
        value={tabs.main}
        active={activeTab === tabs.main}
        onClick={setActiveTab}
      >
        {tabs.main}
      </Tab>
    </div>
  );
};

export default TabContainer;
