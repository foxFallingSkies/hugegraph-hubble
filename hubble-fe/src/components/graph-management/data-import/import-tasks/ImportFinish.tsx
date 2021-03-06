import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { useRoute, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@baidu/one-ui';

import {
  ImportManagerStoreContext,
  GraphManagementStoreContext,
  DataImportRootStoreContext
} from '../../../../stores';

import PassIcon from '../../../../assets/imgs/ic_pass.svg';

const ImportFinish: React.FC = observer(() => {
  const importManagerStore = useContext(ImportManagerStoreContext);
  const dataImportRootStore = useContext(DataImportRootStoreContext);
  const { dataMapStore, serverDataImportStore } = dataImportRootStore;
  const [, params] = useRoute(
    '/graph-management/:id/data-import/import-manager/:jobId/import-tasks/:status*'
  );
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  return (
    <div className="import-tasks-complete-hint">
      <div className="import-tasks-complete-hint-description">
        <img src={PassIcon} alt="complete" />
        <div>
          <div>{t('data-import-status.finished')}</div>
          <div>
            {t('data-import-status.success', {
              number: serverDataImportStore.successImportFileStatusNumber
            })}
            {serverDataImportStore.pausedImportFileNumber !== 0 &&
              `，${t('data-import-status.pause', {
                number: serverDataImportStore.pausedImportFileNumber
              })}`}
            {serverDataImportStore.abortImportFileNumber !== 0 &&
              `，${t('data-import-status.abort', {
                number: serverDataImportStore.abortImportFileNumber
              })}`}
          </div>
        </div>
      </div>
      <div className="import-tasks-complete-hint-manipulations">
        <Button
          type="primary"
          size="large"
          onClick={() => {
            dataImportRootStore.resetAllFileInfos();
            dataMapStore.dispose();
            serverDataImportStore.dispose();
            dataImportRootStore.dispose();

            importManagerStore.setSelectedJob(null);
            setLocation(
              `/graph-management/${params!.id}/data-import/import-manager`
            );
            importManagerStore.fetchImportJobList();
          }}
        >
          {t('data-import-status.move-to-import-manager')}
        </Button>
      </div>
    </div>
  );
});

export default ImportFinish;
