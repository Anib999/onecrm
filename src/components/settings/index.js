import React from 'react';
import PageHeader from '../common/pageHeader';
import { useTranslation } from 'react-i18next';

const SettingsComponent = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t('settings')}
        hasBreadcrumb
      />
    </>
  )
}

export default SettingsComponent;