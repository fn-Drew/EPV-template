export default function DisplayWhenLoggedIn(props) {
    if (props.user) {
        return props.children; 
    }
    return null;
}
