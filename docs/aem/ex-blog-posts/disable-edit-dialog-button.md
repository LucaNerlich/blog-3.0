---
draft: true
---

```javascript
// disableComponentEditing.js
// DXC-664 - remove "wrench" / open Dialog Button
// overwrites default CONFIGURE display condition
// should disable for .hidden components with no dialog, which are hardcoded on pages and available to authors
(function ($document, author) {
 $document.on('cq-layer-activated', function (ev) {
  if (ev.layer === 'Edit') {
   author.EditorFrame.editableToolbar.config.actions.CONFIGURE.condition = function (editable) {
    if (editable &&
     editable.config &&
     editable.config.dialog &&
     editable.config.dialog === '/apps/kaufland/core/components/content/abstractcomponent/cq:dialog') {
     return false;
    }
    return author.pageInfoHelper.canModify() && editable.hasAction("CONFIGURE") && !!editable.config.dialog
   }
  }
 });
})($(document), Granite.author);

```

```xml
<!-- clientlib .content.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0"
 xmlns:jcr="http://www.jcp.org/jcr/1.0"
 jcr:primaryType="cq:ClientLibraryFolder"
 categories="[cq.authoring.dialog.all]"
 embed="[]"
 allowProxy="{Boolean}true"/>
```

```text
#base=js
disableComponentEditing.js
```
