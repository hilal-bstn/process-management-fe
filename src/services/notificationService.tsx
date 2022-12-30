import { notification } from "antd";
import { NotificationModel } from "../models/notificationModel";


const openInfoNotification = (notificationModel:NotificationModel) => {
  notification.info({
        message: notificationModel.title,
        description:notificationModel.description,
        placement:notificationModel.placement,
      });
    };

const openSuccessNotification = (notificationModel:NotificationModel) => {
  notification.success({
    message: notificationModel.title,
    description:notificationModel.description,
    placement:notificationModel.placement,
      });
    };

const openErrorNotification = (notificationModel:NotificationModel) => {
  notification.error({
    message: notificationModel.title,
    description:notificationModel.description,
    placement:notificationModel.placement,
      });
    };

const NotificationService = {
    openInfoNotification,
    openSuccessNotification,
    openErrorNotification
};

export default NotificationService;

