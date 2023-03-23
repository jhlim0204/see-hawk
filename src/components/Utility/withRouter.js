import { useNavigate, useParams, useLocation } from 'react-router-dom';
/**

A higher-order component that adds router-related props to a component using the react-router-dom library.

@param {React.ComponentType} Component - The component to wrap.

@returns {React.ComponentType} - The wrapped component.
*/
export const withRouter = (Component) => {
    /*

A wrapper component that passes router-related props to the wrapped component.

@param {object} props - The props passed to the component.

@returns {JSX.Element} - The wrapped component with router-related props.
*/
    const Wrapper = (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return <Component navigate={navigate} params={params} location={location} {...props} />;
    };

    return Wrapper;
};
