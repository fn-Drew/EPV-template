import { useSelector } from "react-redux";

export default function DisplayWhenLoggedIn({ children }) {
    const user = useSelector(state => state.user);
    if (user) {
        return children;
    }
    return null;
}
