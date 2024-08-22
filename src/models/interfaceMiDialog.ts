export interface IDialog {
    open: boolean;
    title: string;
    typeMessage?: "check" | "error" | "alert";
    message: string;
    action: any[];
  }
  