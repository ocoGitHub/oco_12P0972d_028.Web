var dataTableNoAjax_defaultButtons=[
    {
        extend: 'copyHtml5',
        text: '剪貼簿',
    },
   "excel",
    {
        extend: 'csv',
        text: 'CSV',
        bom: true
    },
    {
       extend:'print',
       text:'列印'
    }

] ;

var dataTableNoAjax_defaultlengthMenu=[10, 20,25,50,100];

var dataTableNoAjax={
        data:null,
        //columns: [
           
        //],
        //order: [[1, 'asc']],
        //dom: 'lBfrtip',
        //dom: 'lBfrtip',
        dom: 'lBfrtip',
        destroy:true,
        buttons:{
             buttons:[
               
                  
                    { extend: 'excel', className: 'ml-2 border text-blue-500 rounded py-1',text: '匯出 excel' }
                
                // {
               //      extend: 'copyHtml5',
               //      text: '剪貼簿',
               //  },
               // "excel",
               //  {
                //     extend: 'csv',
                //     text: 'CSV',
                //     bom: true
                // },
               //  {
               //     extend:'print',
               //     text:'列印'
                // }

             ] 

        },
        "lengthMenu": [10, 20,25,50,100],
        //retrieve: true,
        language: {
            "processing": "處理中...",
            "lengthMenu": "顯示 _MENU_ 項結果",
            "zeroRecords": "沒有匹配結果",
            "info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
            "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
            "infoFiltered": "(由 _MAX_ 項結果過濾)",
            "search": "搜索: ",
            "emptyTable": "没有資料",
            "paginate": {
                "first": "首頁",
                "previous": "上頁",
                "next": "下頁",
                "last": "末頁"
            },
            "aria": {
                "sortAscending": ": 以升序排列此列",
                "sortDescending": ": 以降序排列此列"
            },
            "autoFill": {
                "cancel": "取消",
                "fill": "用 <i>%d<\/i> 填充所有單元格",
                "fillHorizontal": "水平填充單元格",
                "fillVertical": "垂直填充單元格",
                "info": "自動填充示例"
            },
            "buttons": {
                "collection": "集合 <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
                "colvis": "列可見性",
                "colvisRestore": "恢復列可見性",
                "copy": "複製",
                "copyKeys": "按 ctrl 或者 u2318 + C 將表數據複製到剪貼板。<br \/><br \/>要取消，請單擊此消息或按Escape鍵。",
                "copyTitle": "複製到剪貼板",
                "csv": "CSV",
                "excel": "Excel",
                "pdf": "PDF",
                "copySuccess": {
                    "1": "已將 1 行複製到剪貼板",
                    "_": "已將 %d 行複製到剪貼板"
                },
                "pageLength": {
                    "-1": "顯示所有行",
                    "1": "顯示 1 行",
                    "_": "顯示 %d 行"
                },
                "print": "列印"
            },
            "searchBuilder": {
                "add": "添加搜索條件",
                "button": {
                    "0": "搜索生成器",
                    "_": "搜索生成器 (%d)"
                },
                "clearAll": "全部清除",
                "condition": "條件",
                "data": "數據",
                "deleteTitle": "刪除過濾規則",
                "leftTitle": "Outdent 條件",
                "logicAnd": "And",
                "logicOr": "Or",
                "rightTitle": "Indent 條件",
                "title": {
                    "0": "搜索生成器",
                    "_": "搜索生成器 (%d)"
                },
                "value": "值",
                "conditions": {
                    "date": {
                        "after": "日期條件查詢為after條件名稱：大于",
                        "before": "日期條件查詢為before條件名稱：小于",
                        "between": "日期條件查詢為between條件名稱：介于2個日期之間",
                        "empty": "日期條件查詢為empty條件名稱：日期為空",
                        "equals": "日期條件查詢為equals條件名稱：等於",
                        "notBetween": "日期條件查詢為notBetween條件名稱：不介于2個日期之間",
                        "notEmpty": "日期條件查詢為notEmpty條件名稱：日期不為空"
                    },
                    "string": {
                        "contains": "文本包含",
                        "empty": "文本為空",
                        "endsWith": "文本以某某結尾",
                        "equals": "文本等於",
                        "not": "文本不等於",
                        "notEmpty": "文本不為空",
                        "startsWith": "文本從某某開始"
                    }
                }
            },
            "searchPanes": {
                "collapse": {
                    "0": "搜索欄",
                    "_": "搜索欄（%d）"
                },
                "title": "應用的過濾器 - %d",
                "clearMessage": "全部清除",
                "count": "計數",
                "countFiltered": "過濾計數",
                "emptyPanes": "沒有搜索欄",
                "loadMessage": "正在加載搜索欄"
            },
            "searchPlaceholder": "請輸入查詢關鍵字",
            "select": {
                "_": "選擇了%d行",
                "cells": {
                    "1": "選擇了1個單元格",
                    "_": "選擇了%d個單元格"
                },
                "columns": {
                    "1": "選擇了1列",
                    "_": "選擇了%d列"
                },
                "0": "沒有選中數據行的文字說明",
                "1": "選中一行的文字說明",
                "rows": {
                    "1": "被選中一行的說明",
                    "_": "被選中多行的說明"
                }
            },
            "decimal": "用於標記小數位的字符",
           // "infoPostFix": "分頁數據信息說明",
           // "infoThousands": "千分數分隔符，默認值是英文逗號",
            "loadingRecords": "數據加載提示信息，例如：數據加載中...",
            //"thousands": "千位分隔符，默認值是英文逗號"
        }
    
};