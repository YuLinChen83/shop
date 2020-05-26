import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CollectionsOverview from 'components/CollectionsOverview';
import CollectionPage from 'pages/Collection';
import { firestore, convertCollectionsSnapshotToMap } from 'firebase/utils';
import { updateCollections } from 'redux/shop/actions';

const ShopPage = ({ match, updateCollections }) => {
  useEffect(() => {
    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
}

const mapDispatchToProps = { updateCollections };

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);