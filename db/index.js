r = require('rethinkdb');
var conn;
r.connect({
     host: '93.190.44.80'
}, function(err, connection) {
    if (err) throw err;
    conn = connection;
});

var ref = r.db("uassist").table("index");

var insertItem = (item,callback) =>{
    ref.insert(item).run(conn,(err,res)=>{
        callback();
    })
}

var getList = callback => {
    ref.orderBy({index:"sort"}).filter({type:"section"}).run(conn,(err,cur)=>{
        cur.toArray((err,res)=>{
            callback(res)});
    })
}

var deleteItem = (id,callback) => {
    ref.get(id).delete().run(conn,(err,res)=>{
        callback();
    })
}

var getArray = (type,callback) =>{
    ref.orderBy({index:"sort"}).filter({type:type}).run(conn,(err,cur)=>{
        cur.toArray((err,res)=>callback(res));
    })
}

var getItem = (id, callback) =>{
    console.log(id);
    ref.get(id).run(conn,(err,res)=>{
        console.log(res);
        callback(res);
    })
}

var updateItem = (id,e,callback) => {
    ref.get(id).update(e).run(conn,(err,res)=>{
        callback();
    })
}

var getArrays = (callback) => {
    let arrays = {};
    ref.orderBy({index:"sort"}).filter({type:"services"}).run(conn,(err,cur)=>{
        cur.toArray((err,res)=>{
            arrays.services = res;
            ref.orderBy({index:"sort"}).filter({type:"features"}).run(conn,(err,cur)=>{
                cur.toArray((err,res)=>{
                    arrays.features = res;
                    ref.orderBy({index:"sort"}).filter({type:"testimonial"}).run(conn,(err,cur)=>{
                        cur.toArray((err,res)=>{
                            arrays.testimonial = res;
                            ref.orderBy({index:"sort"}).filter({type:"faq"}).run(conn,(err,cur)=>{
                                cur.toArray((err,res)=>{
                                    arrays.faq = res;
                                    callback(arrays);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}


var insert = () => {
    ref.insert([
        {
            id:"services_null",
            name:"Назва",
            desc:"Опис",
            sort:"Порядок",
            ico:"Клас іконки"
        },
        {
            id:"features_null",
            name:"Назва",
            desc:"Опис",
            sort:"Порядок",
            ico:"Клас іконки"
        },
        {
            id:"testimonial_null",
            name:"Назва",
            desc:"Опис",
            sort:"Порядок",
            url:"Шлях до картинки"
        },
        {
            id:"faq_null",
            name:"Назва",
            desc:"Опис",
            sort:"порядок"
        }
    ])
}

var table_items = [{
        title: "Ppa per hour",
        desc: "The Roosevelt dime is the current ten-cent piece of the United States, displaying President Franklin D. Roosevelt on theobverse.",
        rate_item: ["Different hour rate for different services"],
        btn: "Contact us"
    },
    {
        title: "Traveller package",
        desc: "The Roosevelt dime is the current ten-cent piece of the United States, displaying President Franklin D. Roosevelt on theobverse.",
        rate_item: ["up to 4h", "up to 8h"],
        btn: "Book now"
    },
    {
        title: "Research package",
        desc: "The Roosevelt dime is the current ten-cent piece of the United States, displaying President Franklin D. Roosevelt on theobverse.",
        rate_item: ["up to 4h", "up to 8h"],
        btn: "Book now"
    },
    {
        title: "Business package",
        desc: "The Roosevelt dime is the current ten-cent piece of the United States, displaying President Franklin D. Roosevelt on theobverse.",
        rate_item: ["up to 4h", "up to 8h"],
        btn: "Book now"
    },
    {
        title: "Individual project",
        desc: "The Roosevelt dime is the current ten-cent piece of the United States, displaying President Franklin D. Roosevelt on theobverse.",
        rate_item: ["Contact us and we'll discuss your project"],
        btn: "Contact us"
    }
];
var menu_list = [{
        name: "Home",
        id: "video-area"
    },
    {
        name: "Services",
        id: "services"
    },
    {
        name: "How?",
        id: "features"
    }, {
        name: "Packages",
        id: "pricing"
    }, {
        name: "Contact",
        id: "contact"
    }, {
        name: "subscribe",
        id: "Subscribe"
    }
]



module.exports.table_items = table_items;
module.exports.menu_list = menu_list;
module.exports.getList = getList;
module.exports.getItem =getItem;
module.exports.updateItem = updateItem;
module.exports.getArray = getArray;
module.exports.deleteItem = deleteItem;
module.exports.getArrays = getArrays;
module.exports.insertItem = insertItem;