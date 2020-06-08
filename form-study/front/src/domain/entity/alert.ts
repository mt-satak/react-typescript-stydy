export type AlertState = {
  // alertの種類
  severity: AlertSeverity;
  // alertに表示するメッセージ
  message: string;
  // snackbarを表示しているかどうか
  open: boolean;
};

export type AlertSeverity = "error" | "success";