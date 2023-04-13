import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function DisplayWhenLoggedIn({ children }) {
    const user = useSelector(state => state.user);
    if (user) {
        return children;
    }
    return null;
}

DisplayWhenLoggedIn.propTypes = {
    children: PropTypes.node.isRequired,
};
