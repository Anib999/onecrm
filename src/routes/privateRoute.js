import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated } from '../utils/jwtUtil';
import { Redirect } from 'react-router-dom';
import ErrorBoundary from '../utils/errorBoundary';
import { getStatusListApi, getDifficultyListApi, getAddressTypeApi, getUserRolesApi } from '../services/extraServices';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { storeUserData } from '../store/slices/profileSlice';
import { getAllDepartmentApi } from '../services/departmentService';
import AppSpinner from '../components/common/spinner';

const PrivateRoute = ({ component: Component, layout: Layout, forEdit, secondaryNav, secondaryNavigation, ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profileReducer = useSelector(state => state.profile);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // console.log('private mount')
    // checkAuthentication();
    essentialServices();
  }, [])

  const checkAuthentication = () => {
    setIsLoading(true)
    let userObj = localStorage.getItem('user');
    if (userObj || profileReducer?.userData) {
      // console.log('asdas')
      let parsedData = JSON.parse(userObj);
      // console.log('parsedData', parsedData)
      if (!profileReducer?.userData) {
        dispatch(storeUserData(parsedData))
      }
      setIsLoading(false)
      return true
    }
    // console.log('go back')
    // history.push({
    //   pathname: '/login'
    // })
    setIsLoading(false)

    return false

  }


  const essentialServices = () => {
    dispatch(getStatusListApi())
    dispatch(getDifficultyListApi())
    dispatch(getAddressTypeApi())
    dispatch(getUserRolesApi())
    dispatch(getAllDepartmentApi({ page: 1 }, () => { }));
  }

  if (isLoading) {
    return (
      <AppSpinner />
    )
  }

  return (
    <Route
      {...rest}
      render={props => (
        checkAuthentication() ?
          <Layout secondaryNav={secondaryNav} secondaryNavigation={secondaryNavigation}>
            <ErrorBoundary>
              <Component forEdit={forEdit} {...props} />
            </ErrorBoundary>
          </Layout>
          :
          <Redirect to={{
            pathname: '/login'
          }} />
      )}
    />
  )
}

export default PrivateRoute;