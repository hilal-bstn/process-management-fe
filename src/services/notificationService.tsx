import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { NotificationModel } from "../models/notificationModel";


const openInfoNotification = (notificationModel:NotificationModel) => {
  notification.info({
        message: notificationModel.title,
        description:notificationModel.description,
        placement:notificationModel.placement,
      });
    };

const openSuccessNotification = (placement: NotificationPlacement) => {
  notification.success({
        message: `Notification ${placement}`,
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement,
      });
    };

const openErrorNotification = (placement: NotificationPlacement) => {
  notification.error({
        message: `Notification ${placement}`,
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement,
      });
    };

const NotificationService = {
    openInfoNotification,
    openSuccessNotification,
    openErrorNotification
};

export default NotificationService;

