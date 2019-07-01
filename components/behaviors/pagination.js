const paginationonBev = Behavior( {
    data: {
        dataArr: [],
        total: 0,
        NoSearchResult: false,
        loading: false
    }
    ,
    methods: {
        setMoreData ( dataArr )
        {
            const temArr = this.data.dataArr.concat( dataArr );
            this.setData( {
                dataArr: temArr
            } )

        },
        getCurrentStart ()
        {
            return this.data.dataArr.length;
        }
        ,
        setTotal ( total )
        {
            this.data.total = total

            if ( total == 0 )
            {
                this.setData( {
                    NoSearchResult: true
                } )
            }
        },
        hasMore ()
        {
            if ( this.data.dataArr.length >= this.data.total )
            {
                return false
            } else
            {
                return true
            }
        }
        ,
        initailize ()
        {
            this.setData( {
                dataArr: [],
                NoSearchResult: false,
                loading: false
            } )
            this.data.total = null

        }


        ,
        _isLocked ()
        {
            //shi fou shi suozhu de zhuangtai 
            return this.data.loading ? true : false
        },
        _locked ()
        {
            this.setData( {
                loading: true
            } )
        },
        _unLocked ()
        {
            this.setData( {
                loading: false
            } )
        },

    }
} )

export
{
    paginationonBev
}