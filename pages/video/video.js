import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[], //导航标签数据
    navId: '',         // 导航的标识
    videoList: [],     //视屏列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取导航数据
    this.getVideoGroupListData();
  },

  //获取导航数据
  async getVideoGroupListData(){
    let videoGroupListData = await request("/video/group/list");
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0,14),
      navId: videoGroupListData.data[0].id
    })

    //获取视频列表中的数据
    this.getVideoList(this.data.navId);
  },

  //获取视频列表数据
  async getVideoList(navId){
    if(!navId){//空串情况
      return;
    }
    let videoListData = await request("/video/group",{id:navId})
    //关闭消息提示框
    wx.hideLoading();

    let index = 0;
    let videoList = videoListData.datas.map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      videoList: videoList,
      isTriggered: false // 关闭下拉刷新
    })
  },

  // 点击切换导航的回调
  changeNav(event){
    let navId = event.currentTarget.id;    // 通过id向event传参的时候如果传的是number会自动转换成string
    // let navId = event.currentTarget.dataset.id;
    this.setData({
      navId: navId>>>0,
      videoList: []
    })
    // 显示正在加载
    wx.showLoading({
      title: '正在加载'
    })
    // 动态获取当前导航对应的视频数据
    this.getVideoList(this.data.navId);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})