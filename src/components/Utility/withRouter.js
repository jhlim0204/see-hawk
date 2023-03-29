import { useNavigate, useParams, useLocation } from 'react-router-dom';

/**
 * A higher-order component that adds router-related props to a component using the react-router-dom library.
 * @param {JSX.Element} Component - The React component to wrap.
 * @returns {JSX.Element} - The wrapped React component.
 */
export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return <Component navigate={navigate} params={params} location={location} {...props} />;
    };

    return Wrapper;
};
