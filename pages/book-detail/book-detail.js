import { BookModel } from "../../models/book";
import { LikeModel } from "../../models/like";

// pages/book-detail/book-detail.js
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page( {

  /**
   *  yemian ru he jishou waibu de canshu 页面的初始数据
   */
  data: {

    comments: null,
    book: null,
    likeStatus: null,
    likeCount: null,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ( options )
  {
    wx.showLoading();
    const bid = options.bid;
    //zheyang wo meng jiu na dao yige promise
    const detail = bookModel.getDetail( bid )
    const comments = bookModel.getComment( bid )
    const likeStatus = bookModel.getLikeStatus( bid )

    // /新型promise合体
    Promise.all( [ detail, comments, likeStatus ] )
      .then( res =>
      {
        console.log( res );

        this.setData( {
          book: res[ 0 ]
          , comments: res[ 1 ].comments
          , likeStatus: res[ 2 ].like_status
          , likeCount: res[ 2 ].fav_nums
        } )

        wx.hideLoading();
      } )

    // detail.then( ( res ) =>
    // {
    //   console.log( res );

    //   this.setData( {
    //     book: res
    //   } )
    // } )

    // comments.then( ( res ) =>
    // {
    //   console.log( res );
    //   this.setData( {
    //     comments: res.comments
    //   } )
    // } )
    // likeStatus.then( ( res ) =>
    // {
    //   console.log( res );
    //   this.setData( {
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   } )
    // } )

  },

  onLike ( event )
  {
    const likeOrcancel = event.detail.behavior;
    //400代表书籍
    likeModel.like( likeOrcancel, this.data.book.id, 400 );

  },
  onCancel ( event )
  {
    this.setData( {
      posting: false
    } )
  },
  onPost ( event )
  {
    //tapping   or input li mian huoqu yong hu zhengzheng de shuru 

    const comment = event.detail.text || event.detail.value;


    if ( comment.length > 12 )
    {
      wx.showToast( {
        title: "杰哥提示，短评最多12个字哦"
        , icon: 'none'
      } )
      return
    }
    this.setData( {
      posting: false

    } )
    bookModel.postComment( this.data.book.id, comment )
      .then( res =>
      {

        wx.showToast( {
          title: '+1'
          , icon: 'success'
        } )

        //gengxing dao duanping  shuzu limian qu this.setdata
        this.data.comments.unshift( {
          content: comment,
          nums: 1
        } )
        this.setData( {
          comments: this.data.comments,
        } )
      } )

    //input chuli yixia


  },

  onFakePost ( event )
  {
    this.setData( {
      posting: true
    } )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function ()
  {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function ()
  {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function ()
  {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function ()
  {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function ()
  {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function ()
  {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ()
  {

  }
} )