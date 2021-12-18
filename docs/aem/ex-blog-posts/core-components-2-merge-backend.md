# Extending Core Components Part 2 - Extending Java Backend

This post explains, how you can extend the functionality of AEM Core Components. Part 2 focuses on the backend extension
and reusability of the core components already implemented logic.

- [Part 1](./core-components-1-merge-dialogs.md)
- [Part 2](./core-components-2-merge-backend.md)

## TL:DR

By using two features from [ACS Commons](https://adobe-consulting-services.github.io/acs-aem-commons/), we can easily
reuse already implemented dialogs and logic from a core component, add additional properties and export it to the
.model.json

We include snippets from the original dialog
via [Parameterized Namespace Granite Include](https://adobe-consulting-services.github.io/acs-aem-commons/features/granite/parameterized-namespace-include/index.html)
and we inject the original sling model into our custom sling model
via [Child Resource From Request Injector](https://adobe-consulting-services.github.io/acs-aem-commons/features/sling-model-injectors/child-resource-from-request/index.html)
.

## Reuse Core Component Sling Model

We use the Child Resource From Request Injector to enable the injected Object to access a Sling Request. Therefore, the
Image Core Component can correclty populate all its fields.

The ACS Commons website describes the injector as follows

> This injector is similar to the standard @ChildResource injector provided by sling, but with a key difference in that it uses a mock request object pointed to the resource path as the adaptable, allowing the sling model to reference the request and other sling bindings not otherwise accessible when adapting a resource directly. This is particularly useful when injecting instances of WCM Core components, which are generally not adaptable from Resource and thus fail to inject via the standard @ChildResource injector.

This functionality enables us to create custom components, while reusing the core components at the same time. Usually
in projects, an author would like to create complex components, consisting out of images, text, checkbox etc. This can
now be done easily, while minimized code repetition.

```java
@ChildResourceFromRequest
private com.adobe.cq.wcm.core.components.models.Image image;
```

### Complete Class Example

This examples uses Lombok Annotations to avoid 'getter/setter' spam in simple Java pojo classes.

By injecting our 'image' object with the aformentioned acs injector, we levarge the full Core Components Image Component
Sling Model and (whatever) logic it uses itself. We can inject the 'ctaLinks' (check Part 1 for the dialog.xml) via a
regular `@ChildResource`, since we are passing untouched json data from the jcr to the .model.json.

```java
// core/src/main/java/com/mysite/core/models/image/ExtendedImage.java
package com.mysite.core.models.image;

import com.adobe.acs.commons.models.injectors.annotation.ChildResourceFromRequest;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.annotation.PostConstruct;

@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = {ExtendedImage.class, ComponentExporter.class},
        resourceType = ExtendedImage.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Getter
@Setter
public class ExtendedImage implements ComponentExporter {
    
    public static final String RESOURCE_TYPE = "mysite/components/extendedimage";
    
    @ChildResourceFromRequest
    private com.adobe.cq.wcm.core.components.models.Image image;
    
    @ChildResource
    private Resource ctaLinks;
        
    public com.adobe.cq.wcm.core.components.models.Image getImage() {
        return image;
    }
    
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
```

### Example Json Export

Implementing above Sling Model and the Component from Part enables us to create a custom Image component, '
extendedImage', which exportes all Core Components Image Component properties under the namespace 'image', as well as
own additional properties.

```json
// /content/mysite/fr/en/home.model.json
extendedimage: {
image: {
id: "some-id",
alt: "my alt text",
title: "my caption",
src: "/content/mysite/fr/en/home/_jcr_content/root/responsivegrid/extendedimage/image.img.jpeg/1617021471391/myCustomImage.jpeg",
link: "/content/mysite/fr/en/discover.html",: type: "nt:unstructured",
dataLayer: {
some - id: {
@type: "nt:unstructured",
repo: modifyDate: "2021-03-29T12:37:51Z",
dc: title: "my caption",
xdm: linkURL: "/content/mysite/fr/en/discover.html",
image: {
repo: id: "3227649d-917f-461f-afc6-7d545d51cb33",
repo: modifyDate: "2021-03-22T15:21:43Z",
@type: "image/jpeg",
repo: path: "/content/dam/mysite/discoverpage/myCustomImage.jpeg",
xdm: tags: [],
xdm: smartTags: {
}
}
}
}
},
ctaLinks: {
jcr: primaryType: "nt:unstructured",
item0: {
jcr: primaryType: "nt:unstructured",
path: "/content/mysite/fr/en/home",
title: "CTA 1"
},
item1: {
jcr: primaryType: "nt:unstructured",
path: "/content/mysite/fr/en/discover",
title: "CTA 2"
}
},: type: "mysite/components/extendedimage"
}
```

Thanks for reading!

luca

## Links & Downloads

- [Core Components Releases](https://github.com/adobe/aem-core-wcm-components/releases)
- [Core Components Library](https://www.aemcomponents.dev/)
- [Image Core Component](https://www.aemcomponents.dev/content/core-components-examples/library/page-authoring/image.html)
- [Parameterized Namespace Granite Include](https://adobe-consulting-services.github.io/acs-aem-commons/features/granite/parameterized-namespace-include/index.html)
- [Child Resource From Request Injector](https://adobe-consulting-services.github.io/acs-aem-commons/features/sling-model-injectors/child-resource-from-request/index.html)

## Credits

Thanks to [Niek Raaijmakers](https://github.com/niekraaijmakers) for figuring some of this out :)
