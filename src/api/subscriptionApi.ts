import Api from "./apiConfigs";

class SubscriptionApi {
  endPoints = {
    allSubscription: "/subscription/all",
    acceptSubscription: "/subscription/accept-subscription",
    rejectSubscription: "/subscription/reject-subscription",
  };
  async getAllSubscription() {
    return await Api?.http?.get(this.endPoints.allSubscription);
  }
  async acceptSubscription(subscriptionId: string, courseId: string) {
    const url = `${this.endPoints.acceptSubscription}/${subscriptionId}/${courseId}`;
    return await Api.http?.post(url);
  }
  async rejectSubscription(subscriptionId: string, courseId: string) {
    const rejectionDetails = "We are very sorry";
    const url = `${this.endPoints.rejectSubscription}/${subscriptionId}/${courseId}`;
    return await Api.http?.post(url, rejectionDetails);
  }
}

export default new SubscriptionApi();
