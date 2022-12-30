import { notification } from "antd";
import { NotificationModel } from "../models/notificationModel";


const openInfoNotification = (notificationModel:NotificationModel) => {
  notification.info({
        message: notificationModel.title,
        description:notificationModel.description,
        placement:notificationModel.placement,
        duration: 1.5
      });
    };

const openSuccessNotification = (notificationModel:NotificationModel) => {
  notification.success({
        message: notificationModel.title,
        description:notificationModel.description,
        placement:notificationModel.placement,
        duration: 1.3
      });
    };

const openErrorNotification = (notificationModel:NotificationModel) => {
  notification.error({
        message: notificationModel.title,
        description:notificationModel.description,
        placement:notificationModel.placement,
        duration: 1.7
      });
    };

const NotificationService = {
    openInfoNotification,
    openSuccessNotification,
    openErrorNotification
};

export default NotificationService;

