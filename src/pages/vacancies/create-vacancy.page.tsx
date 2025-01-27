import React, { useState } from "react";
import Tabs from "components/tabs/tabs.component";
import { Text } from "components/text.component";
import { sources, sourceToIcon } from "constants/shared.constant";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "assets";
import HeadHunterForm from "components/create-vacancy-forms/head-hunter-form.component";
import PageHeader from "components/page-header/page-header.component";

const CreateVacancyPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const tabs = sources.map(source => ({
        value: source,
        label: t(`candidates.${source}`),
        icon: sourceToIcon[source],
    }));

    const [activeTab, setActiveTab] = useState<string>(tabs[0].value);

    return (
        <div className='vacancies'>
            <PageHeader title={t('vacancies.title')} isBack />

            <div className="create-vacancies__body vacancies__body">
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {activeTab === tabs[1].value && <HeadHunterForm />}
            </div>
        </div>
    );
};

export default CreateVacancyPage;