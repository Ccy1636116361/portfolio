export type MenuOptions = {
  groupName: string;
  protected: boolean;
  actions: {
    title: string;
    subtitle: string;
    link?: string;
    icon: any;
    action?: () => void;
    method?: "POST";
    hideLoggedIn?: boolean;
  }[];
}[];
