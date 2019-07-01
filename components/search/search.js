import { KeyWordModel } from "../../models/keyword";
import { BookModel } from "../../models/book";
import { paginationonBev } from "../behaviors/pagination";
const bookmodel = new BookModel();
const keywordmodel = new KeyWordModel();
Component( {

  data: {
    historyWords: [],
    hotwords: [],
    dataArr: [],
    searching: false,
    tagDetext: '',
    loading: false,
    loadingCenter: false
    // shifou fa sheng qing qiu
  },
  attached ()
  {

    this.setData( {
      historyWords: keywordmodel.getHistory()
    } )

    // search zujian de  fuyong  buyao kaiffang yige properties
    keywordmodel.getHot().then( res =>
    {
      this.setData( {
        hotwords: res.hot
      } )
    } )
  },
  behaviors: [ paginationonBev ]
  ,
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },
  methods: {
    loadMore ()
    {

      if ( this._isLocked() )
      {
        return
      }

      //suozhu
      if ( this.hasMore() )
      {
        this._locked()
        bookmodel.search( this.getCurrentStart()
          , this.data.tagDetext )

          .then( ( res ) =>
          {
            this.setMoreData( res.books )
            this._unLocked()
          }, () =>
            {
              this._unLocked()
            } )

      }
    },
    onConfirm ( event )
    {
      this._showResult()
      this._showLoadingCenter()
      this.initailize()
      const word = event.detail.value || event.detail.text;
      bookmodel.search( 0, word )
        .then( res =>
        {
          this.setMoreData( res.books )
          this.setTotal( res.total )
          this.setData( {
            tagDetext: word
          } )

          keywordmodel.addToHistory( word );
          this._hideLoadingCenter()

        } )
    }
    ,
    _showLoadingCenter ()
    {
      this.setData( {
        loadingCenter: true
      } )
    },

    _hideLoadingCenter ()
    {
      this.setData( {
        loadingCenter: false
      } )
    },


    onCancel ( event )
    {
      this.initailize()
      this.triggerEvent( 'cancel' )
    }
    ,
    onDelete ( event )
    {

      this.initailize()
      this._closeResult()
    },


    _showResult ()
    {
      this.setData( {
        searching: true
      } )
    },
    _closeResult ()
    {

      this.setData( {
        searching: false,
        tagDetext: ''
      } )
    }
  }
} )