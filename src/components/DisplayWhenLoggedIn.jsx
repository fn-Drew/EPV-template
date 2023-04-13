import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function DisplayWhenLoggedIn({ displayWhenNotLoggedIn, children }) {
    const user = useSelector(state => state.user);
    if (user && !displayWhenNotLoggedIn) {
        return children;
    }
    if (displayWhenNotLoggedIn && !user) {
        return children
    }
    return null;
}

DisplayWhenLoggedIn.propTypes = {
    children: PropTypes.node.isRequired,
    displayWhenNotLoggedIn: PropTypes.bool,
};

DisplayWhenLoggedIn.defaultProps = {
    displayWhenNotLoggedIn: false,
};
