import { useSelector } from "react-redux";
import { StoreState } from "src/redux-toolkit/store";

export const useAuth = (): boolean => {
    const { user_id } = useSelector((store: StoreState) => store.user);
    return user_id !== "";
};