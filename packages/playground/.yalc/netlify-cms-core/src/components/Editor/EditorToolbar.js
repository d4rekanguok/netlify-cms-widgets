import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';
import {
  Icon,
  Dropdown,
  DropdownItem,
  StyledDropdownButton,
  colorsRaw,
  colors,
  components,
  buttons,
} from 'netlify-cms-ui-default';
import { status } from 'Constants/publishModes';
import SettingsDropdown from 'UI/SettingsDropdown';

const styles = {
  noOverflow: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  buttonMargin: css`
    margin: 0 10px;
  `,
  toolbarSection: css`
    height: 100%;
    display: flex;
    align-items: center;
    border: 0 solid ${colors.textFieldBorder};
  `,
  publishedButton: css`
    background-color: ${colorsRaw.tealLight};
    color: ${colorsRaw.teal};
  `,
};

const DropdownButton = styled(StyledDropdownButton)`
  ${styles.noOverflow}
  @media (max-width: 1200px) {
    padding-left: 10px;
  }
`;

const ToolbarContainer = styled.div`
  box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.05), 0 1px 3px 0 rgba(68, 74, 87, 0.1),
    0 2px 54px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 800px;
  z-index: 300;
  background-color: #fff;
  height: 66px;
  display: flex;
  justify-content: space-between;
`;

const ToolbarSectionMain = styled.div`
  ${styles.toolbarSection};
  flex: 10;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const ToolbarSubSectionFirst = styled.div`
  display: flex;
  align-items: center;
`;

const ToolbarSubSectionLast = styled(ToolbarSubSectionFirst)`
  justify-content: flex-end;
`;

const ToolbarSectionBackLink = styled(Link)`
  ${styles.toolbarSection};
  border-right-width: 1px;
  font-weight: normal;
  padding: 0 20px;

  &:hover,
  &:focus {
    background-color: #f1f2f4;
  }
`;

const ToolbarSectionMeta = styled.div`
  ${styles.toolbarSection};
  border-left-width: 1px;
  padding: 0 7px;
`;

const ToolbarDropdown = styled(Dropdown)`
  ${styles.buttonMargin};

  ${Icon} {
    color: ${colorsRaw.teal};
  }
`;

const BackArrow = styled.div`
  color: ${colors.textLead};
  font-size: 21px;
  font-weight: 600;
  margin-right: 16px;
`;

const BackCollection = styled.div`
  color: ${colors.textLead};
  font-size: 14px;
`;

const BackStatus = styled.div`
  margin-top: 6px;
`;

const BackStatusUnchanged = styled(BackStatus)`
  ${components.textBadgeSuccess};

  &::after {
    height: 12px;
    width: 15.5px;
    color: ${colors.successText};
    margin-left: 5px;

    position: relative;
    top: 1px;

    content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' width='15' height='11'><path fill='#005614' fill-rule='nonzero' d='M4.016 11l-.648-.946a6.202 6.202 0 0 0-.157-.22 9.526 9.526 0 0 1-.096-.133l-.511-.7a7.413 7.413 0 0 0-.162-.214l-.102-.134-.265-.346a26.903 26.903 0 0 0-.543-.687l-.11-.136c-.143-.179-.291-.363-.442-.54l-.278-.332a8.854 8.854 0 0 0-.192-.225L.417 6.28l-.283-.324L0 5.805l1.376-1.602c.04.027.186.132.186.132l.377.272.129.095c.08.058.16.115.237.175l.37.28c.192.142.382.292.565.436l.162.126c.27.21.503.398.714.574l.477.393c.078.064.156.127.23.194l.433.375.171-.205A50.865 50.865 0 0 1 8.18 4.023a35.163 35.163 0 0 1 2.382-2.213c.207-.174.42-.349.635-.518l.328-.255.333-.245c.072-.055.146-.107.221-.159l.117-.083c.11-.077.225-.155.341-.23.163-.11.334-.217.503-.32l1.158 1.74a11.908 11.908 0 0 0-.64.55l-.065.06c-.07.062-.139.125-.207.192l-.258.249-.26.265c-.173.176-.345.357-.512.539a32.626 32.626 0 0 0-1.915 2.313 52.115 52.115 0 0 0-2.572 3.746l-.392.642-.19.322-.233.382H4.016z'/></svg>");
  }
`;

const BackStatusChanged = styled(BackStatus)`
  ${components.textBadgeDanger};
`;

const ToolbarButton = styled.button`
  ${buttons.button};
  ${buttons.default};
  ${styles.buttonMargin};
  ${styles.noOverflow};
  display: block;

  @media (max-width: 1200px) {
    padding: 0 10px;
  }
`;

const DeleteButton = styled(ToolbarButton)`
  ${buttons.lightRed};
`;

const SaveButton = styled(ToolbarButton)`
  ${buttons.lightBlue};
`;

const PublishedToolbarButton = styled(DropdownButton)`
  ${styles.publishedButton}
`;

const PublishedButton = styled(ToolbarButton)`
  ${styles.publishedButton}
`;

const PublishButton = styled(DropdownButton)`
  background-color: ${colorsRaw.teal};
`;

const StatusButton = styled(DropdownButton)`
  background-color: ${colorsRaw.tealLight};
  color: ${colorsRaw.teal};
`;

const PreviewButtonContainer = styled.div`
  margin-right: 12px;
  color: ${colorsRaw.blue};
  display: flex;
  align-items: center;

  a,
  ${Icon} {
    color: ${colorsRaw.blue};
  }

  ${Icon} {
    position: relative;
    top: 1px;
  }
`;

const RefreshPreviewButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  color: ${colorsRaw.blue};

  span {
    margin-right: 6px;
  }
`;

const PreviewLink = RefreshPreviewButton.withComponent('a');

const StatusDropdownItem = styled(DropdownItem)`
  ${Icon} {
    color: ${colors.infoText};
  }
`;

class EditorToolbar extends React.Component {
  static propTypes = {
    isPersisting: PropTypes.bool,
    isPublishing: PropTypes.bool,
    isUpdatingStatus: PropTypes.bool,
    isDeleting: PropTypes.bool,
    onPersist: PropTypes.func.isRequired,
    onPersistAndNew: PropTypes.func.isRequired,
    onPersistAndDuplicate: PropTypes.func.isRequired,
    showDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteUnpublishedChanges: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
    onPublish: PropTypes.func.isRequired,
    unPublish: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onPublishAndNew: PropTypes.func.isRequired,
    onPublishAndDuplicate: PropTypes.func.isRequired,
    user: ImmutablePropTypes.map.isRequired,
    hasChanged: PropTypes.bool,
    displayUrl: PropTypes.string,
    collection: ImmutablePropTypes.map.isRequired,
    hasWorkflow: PropTypes.bool,
    useOpenAuthoring: PropTypes.bool,
    hasUnpublishedChanges: PropTypes.bool,
    isNewEntry: PropTypes.bool,
    isModification: PropTypes.bool,
    currentStatus: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired,
    deployPreview: ImmutablePropTypes.map,
    loadDeployPreview: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { isNewEntry, loadDeployPreview } = this.props;
    if (!isNewEntry) {
      loadDeployPreview({ maxAttempts: 3 });
    }
  }

  componentDidUpdate(prevProps) {
    const { isNewEntry, isPersisting, loadDeployPreview } = this.props;
    if (!isNewEntry && prevProps.isPersisting && !isPersisting) {
      loadDeployPreview({ maxAttempts: 3 });
    }
  }

  renderSimpleSaveControls = () => {
    const { showDelete, onDelete, t } = this.props;
    return (
      <div>
        {showDelete ? (
          <DeleteButton onClick={onDelete}>{t('editor.editorToolbar.deleteEntry')}</DeleteButton>
        ) : null}
      </div>
    );
  };

  renderDeployPreviewControls = label => {
    const { deployPreview = Map(), loadDeployPreview, t } = this.props;
    const url = deployPreview.get('url');
    const status = deployPreview.get('status');

    if (!status) {
      return;
    }

    const isFetching = deployPreview.get('isFetching');
    const deployPreviewReady = status === 'SUCCESS' && !isFetching;
    return (
      <PreviewButtonContainer>
        {deployPreviewReady ? (
          <PreviewLink rel="noopener noreferrer" target="_blank" href={url}>
            <span>{label}</span>
            <Icon type="new-tab" size="xsmall" />
          </PreviewLink>
        ) : (
          <RefreshPreviewButton onClick={loadDeployPreview}>
            <span>{t('editor.editorToolbar.deployPreviewPendingButtonLabel')}</span>
            <Icon type="refresh" size="xsmall" />
          </RefreshPreviewButton>
        )}
      </PreviewButtonContainer>
    );
  };

  renderSimplePublishControls = () => {
    const {
      collection,
      onPersist,
      onPersistAndNew,
      onPersistAndDuplicate,
      onDuplicate,
      isPersisting,
      hasChanged,
      isNewEntry,
      t,
    } = this.props;

    const canCreate = collection.get('create');
    if (!isNewEntry && !hasChanged) {
      return (
        <>
          {this.renderDeployPreviewControls(t('editor.editorToolbar.deployButtonLabel'))}
          {canCreate ? (
            <ToolbarDropdown
              dropdownTopOverlap="40px"
              dropdownWidth="150px"
              renderButton={() => (
                <PublishedToolbarButton>
                  {t('editor.editorToolbar.published')}
                </PublishedToolbarButton>
              )}
            >
              {
                <DropdownItem
                  label={t('editor.editorToolbar.duplicate')}
                  icon="add"
                  onClick={onDuplicate}
                />
              }
            </ToolbarDropdown>
          ) : (
            <PublishedButton>{t('editor.editorToolbar.published')}</PublishedButton>
          )}
        </>
      );
    }
    return (
      <div>
        <ToolbarDropdown
          dropdownTopOverlap="40px"
          dropdownWidth="150px"
          renderButton={() => (
            <PublishButton>
              {isPersisting
                ? t('editor.editorToolbar.publishing')
                : t('editor.editorToolbar.publish')}
            </PublishButton>
          )}
        >
          <DropdownItem
            label={t('editor.editorToolbar.publishNow')}
            icon="arrow"
            iconDirection="right"
            onClick={onPersist}
          />
          {canCreate ? (
            <>
              <DropdownItem
                label={t('editor.editorToolbar.publishAndCreateNew')}
                icon="add"
                onClick={onPersistAndNew}
              />
              <DropdownItem
                label={t('editor.editorToolbar.publishAndDuplicate')}
                icon="add"
                onClick={onPersistAndDuplicate}
              />
            </>
          ) : null}
        </ToolbarDropdown>
      </div>
    );
  };

  renderWorkflowSaveControls = () => {
    const {
      onPersist,
      onDelete,
      onDeleteUnpublishedChanges,
      showDelete,
      hasChanged,
      hasUnpublishedChanges,
      isPersisting,
      isDeleting,
      isNewEntry,
      isModification,
      t,
    } = this.props;

    const deleteLabel =
      (hasUnpublishedChanges &&
        isModification &&
        t('editor.editorToolbar.deleteUnpublishedChanges')) ||
      (hasUnpublishedChanges &&
        (isNewEntry || !isModification) &&
        t('editor.editorToolbar.deleteUnpublishedEntry')) ||
      (!hasUnpublishedChanges && !isModification && t('editor.editorToolbar.deletePublishedEntry'));

    return [
      <SaveButton key="save-button" onClick={() => hasChanged && onPersist()}>
        {isPersisting ? t('editor.editorToolbar.saving') : t('editor.editorToolbar.save')}
      </SaveButton>,
      !showDelete && !hasUnpublishedChanges && !isModification ? null : (
        <DeleteButton
          key="delete-button"
          onClick={hasUnpublishedChanges ? onDeleteUnpublishedChanges : onDelete}
        >
          {isDeleting ? t('editor.editorToolbar.deleting') : deleteLabel}
        </DeleteButton>
      ),
    ];
  };

  renderWorkflowPublishControls = () => {
    const {
      collection,
      isUpdatingStatus,
      isPublishing,
      onChangeStatus,
      onPublish,
      unPublish,
      onDuplicate,
      onPublishAndNew,
      onPublishAndDuplicate,
      currentStatus,
      isNewEntry,
      useOpenAuthoring,
      isPersisting,
      t,
    } = this.props;

    const canCreate = collection.get('create');
    if (currentStatus) {
      return (
        <>
          {this.renderDeployPreviewControls(t('editor.editorToolbar.deployPreviewButtonLabel'))}
          <ToolbarDropdown
            dropdownTopOverlap="40px"
            dropdownWidth="120px"
            renderButton={() => (
              <StatusButton>
                {isUpdatingStatus
                  ? t('editor.editorToolbar.updating')
                  : t('editor.editorToolbar.setStatus')}
              </StatusButton>
            )}
          >
            <StatusDropdownItem
              label={t('editor.editorToolbar.draft')}
              onClick={() => onChangeStatus('DRAFT')}
              icon={currentStatus === status.get('DRAFT') ? 'check' : null}
            />
            <StatusDropdownItem
              label={t('editor.editorToolbar.inReview')}
              onClick={() => onChangeStatus('PENDING_REVIEW')}
              icon={currentStatus === status.get('PENDING_REVIEW') ? 'check' : null}
            />
            {useOpenAuthoring ? (
              ''
            ) : (
              <StatusDropdownItem
                label={t('editor.editorToolbar.ready')}
                onClick={() => onChangeStatus('PENDING_PUBLISH')}
                icon={currentStatus === status.get('PENDING_PUBLISH') ? 'check' : null}
              />
            )}
          </ToolbarDropdown>
          {useOpenAuthoring ? (
            ''
          ) : (
            <ToolbarDropdown
              dropdownTopOverlap="40px"
              dropdownWidth="150px"
              renderButton={() => (
                <PublishButton>
                  {isPublishing
                    ? t('editor.editorToolbar.publishing')
                    : t('editor.editorToolbar.publish')}
                </PublishButton>
              )}
            >
              <DropdownItem
                label={t('editor.editorToolbar.publishNow')}
                icon="arrow"
                iconDirection="right"
                onClick={onPublish}
              />
              {canCreate ? (
                <>
                  <DropdownItem
                    label={t('editor.editorToolbar.publishAndCreateNew')}
                    icon="add"
                    onClick={onPublishAndNew}
                  />
                  <DropdownItem
                    label={t('editor.editorToolbar.publishAndDuplicate')}
                    icon="add"
                    onClick={onPublishAndDuplicate}
                  />
                </>
              ) : null}
            </ToolbarDropdown>
          )}
        </>
      );
    }

    /**
     * Publish control for published workflow entry.
     */
    if (!isNewEntry) {
      return (
        <>
          {this.renderDeployPreviewControls(t('editor.editorToolbar.deployButtonLabel'))}
          <ToolbarDropdown
            dropdownTopOverlap="40px"
            dropdownWidth="150px"
            renderButton={() => (
              <PublishedToolbarButton>
                {isPersisting
                  ? t('editor.editorToolbar.unpublishing')
                  : t('editor.editorToolbar.published')}
              </PublishedToolbarButton>
            )}
          >
            <DropdownItem
              label={t('editor.editorToolbar.unpublish')}
              icon="arrow"
              iconDirection="right"
              onClick={unPublish}
            />
            {canCreate && (
              <DropdownItem
                label={t('editor.editorToolbar.duplicate')}
                icon="add"
                onClick={onDuplicate}
              />
            )}
          </ToolbarDropdown>
        </>
      );
    }
  };

  render() {
    const { user, hasChanged, displayUrl, collection, hasWorkflow, onLogoutClick, t } = this.props;

    return (
      <ToolbarContainer>
        <ToolbarSectionBackLink to={`/collections/${collection.get('name')}`}>
          <BackArrow>←</BackArrow>
          <div>
            <BackCollection>
              {t('editor.editorToolbar.backCollection', {
                collectionLabel: collection.get('label'),
              })}
            </BackCollection>
            {hasChanged ? (
              <BackStatusChanged>{t('editor.editorToolbar.unsavedChanges')}</BackStatusChanged>
            ) : (
              <BackStatusUnchanged>{t('editor.editorToolbar.changesSaved')}</BackStatusUnchanged>
            )}
          </div>
        </ToolbarSectionBackLink>
        <ToolbarSectionMain>
          <ToolbarSubSectionFirst>
            {hasWorkflow ? this.renderWorkflowSaveControls() : this.renderSimpleSaveControls()}
          </ToolbarSubSectionFirst>
          <ToolbarSubSectionLast>
            {hasWorkflow
              ? this.renderWorkflowPublishControls()
              : this.renderSimplePublishControls()}
          </ToolbarSubSectionLast>
        </ToolbarSectionMain>
        <ToolbarSectionMeta>
          <SettingsDropdown
            displayUrl={displayUrl}
            imageUrl={user.get('avatar_url')}
            onLogoutClick={onLogoutClick}
          />
        </ToolbarSectionMeta>
      </ToolbarContainer>
    );
  }
}

export default translate()(EditorToolbar);
