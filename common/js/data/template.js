/**
 * template.js
 *
 * A collection of precompiled underscore templates to render.  We
 * precompile the template to circumvent the Chrome unsafe-eval
 * restriction.
 */
Agora.Template.Toolbar = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\n\t<div class="btn-group pull-left">\n\n\t\t';
 if (Agora.currentUser) { 
__p+='\n\t\t\t<a href="#manageUsers" role="button" class="btn" data-toggle="modal">\n\t\t\t\t<i class="icon-share"></i> Manage Users\n\t\t\t</a>\n\t\t\t<a href="#addFile" role="button" class="btn" data-toggle="modal">\n\t\t\t\t<i class="icon-plus"></i> Add File\n\t\t\t</a>\n\t\t';
 } else { 
__p+='\n\t\t\t<a href="#newSpace" role="button" class="btn" data-toggle="modal">\n\t\t\t\t<i class="icon-plus"></i> New Space\n\t\t\t</a>\n\t\t';
 }; 
__p+='\n\n\t</div>\n\t<div class="btn-group pull-right">\n\t\t';
 if (Agora.currentUser) { 
__p+='\n\t\t\t<button class="btn"><i class="icon-download-alt"></i> Download</button>\n\t\t\t<a href="#deleteFile" role="button" class="btn" data-toggle="modal">\n\t\t\t\t<i class="icon-trash"></i> Delete\n\t\t\t</a>\n\t\t\t<a href="#renameFile" role="button" class="btn" data-toggle="modal">\n\t\t\t\t<i class="icon-pencil"></i> Rename\n\t\t\t</a>\n\t\t\t<a href="#move" role="button" class="btn" data-toggle="modal">\n\t\t\t\t<i class="icon-share-alt"></i> Move\n\t\t\t</a>\n\t\t';
 } else { 
__p+='\n\t\t\t<a href="#deleteSpace" role="button" class="btn" data-toggle="modal">\n\t\t\t\t<i class="icon-trash"></i> Delete\n\t\t\t</a>\n\t\t\t<a href="#renameSpace" role="button" class="btn" data-toggle="modal">\n\t\t\t\t<i class="icon-pencil"></i> Rename\n\t\t\t</a>\n\t\t';
 }; 
__p+='\n\t</div>\n\t';
}
return __p;
};

Agora.Template.FileList = function(obj){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  with(obj||{}){
    __p+='\n\t<table class="table table-striped" id="file-list">\n\t\t<thead>\n\t\t<tr>\n\t\t\t<th>File Name</th>\n\t\t\t<th>Type</th>\n\t\t\t<th>Last Modified</th>\n\t\t</tr>\n\t\t</thead>\n\t\t<tbody id="file-list">\n\t\t</tbody>\n\t</table>\n\t';
  }
  return __p;
};

Agora.Template.FileView = function(obj){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  with(obj||{}){
    __p+='\n\t\t<td draggable=true class="fileName">'+
      ((__t=( name ))==null?'':__t)+
      '</a></td>\n\t\t<td>'+
      ((__t=( isFolder ? 'folder' : 'file' ))==null?'':__t)+
      '</td>\n\t\t<td>'+
      ((__t=( timestamp ))==null?'':__t)+
      '</td>\n        <td>\n            <a role="button" class="btn renameFile" >\n                <i class="icon-pencil"></i>\n            </a>\n            <a role="button" class="btn deleteFile">\n                <i class="icon-trash"></i>\n            </a>\n        </td>\n\n\t';
  }
  return __p;
};

Agora.Template.RenameFile = function(obj){
  var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  with(obj||{}){
    __p+='\n        <input type="text" name="renameFile" value="'+
      ((__t=( name ))==null?'':__t)+
      '" />\n    ';
  }
  return __p;
};
