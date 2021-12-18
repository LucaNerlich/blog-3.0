# Extending Core Components Part 1 - Merging Dialogs

This post explains, how you can extend the functionality of AEM Core Components. Part 1 focuses on the extension and
reusability of the core components dialog.

- [Part 1](./core-components-1-merge-dialogs.md)
- [Part 2](./core-components-2-merge-backend.md)

## TL:DR

There are two options which allow you to properly reuse Core Components dialogs, or snippets from it.

1. Use sling:resourceSuperType to directly inherit
2. Use Parameterized Namespace Granite Include to include a configurable path into your dialog.

Option 2 is the preferred way, if you want to, more or less, reused the original Core Component in addition to your own
properties. Using namespace include, you've got the option inject the sling model from the component you have inherited
from. More on this in Part 2.

## Introduction

The 'AEM Core Components' Component Library consists of a wide range of basic author-able components. These can be used,
to create and layout content pages without having to program 'the same things all over again'.

The latest Core Component Release can be downloaded from
their [GitHub Release page](https://github.com/adobe/aem-core-wcm-components/releases).

Each GitHub Release produces the following artefacts

![GitHub Release Artifacts](/images/aem/core-components/github-release.jpg)

In general, downloading the `core.wcm.components.all-<version>.zip` and installing it via
the [JCR Package Manager](http://localhost:4502/crx/packmgr/index.jsp) is enough.

If you are running an AEM Cloud SDK, the Core Components will be preinstalled in `/libs/wcm/core`.

### Core Components - Manual Installation

If you want to add the Core Components to your development environment and install via maven / pom.xml, a couple of
additions have to be made. First of, we should add a version variable, then add the required pom dependencies. These
need to be added to the root pom, the 'all' pom, 'core' pom and the 'ui.apps' pom file.

If you bootstrap your development environment via the maven AEM Project Archetype, this will have been done for you.

#### Root POM

```xml
<!-- /pom.xml -->
<core.wcm.components.version>2.15.2</core.wcm.components.version>

    <!-- [...] -->
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.core</artifactId>
<version>${core.wcm.components.version}</version>
</dependency>
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.content</artifactId>
<type>zip</type>
<version>${core.wcm.components.version}</version>
</dependency>
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.config</artifactId>
<type>zip</type>
<version>${core.wcm.components.version}</version>
</dependency>
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.extensions.amp</artifactId>
<version>${core.wcm.components.version}</version>
</dependency>
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.extensions.amp.content</artifactId>
<type>zip</type>
<version>${core.wcm.components.version}</version>
</dependency>
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.examples.ui.apps</artifactId>
<type>zip</type>
<version>${core.wcm.components.version}</version>
</dependency>
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.examples.ui.content</artifactId>
<type>zip</type>
<version>${core.wcm.components.version}</version>
</dependency>
    <!-- [...] -->
```

#### All POM

```xml
<!-- /all/pom.xml -->

<!-- [...] -->
<embedded>
    <groupId>com.adobe.cq</groupId>
    <artifactId>core.wcm.components.content</artifactId>
    <type>zip</type>
    <target>/apps/mysite-vendor-packages/application/install</target>
</embedded>
<embedded>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.core</artifactId>
<target>/apps/mysite-vendor-packages/application/install</target>
</embedded>
<embedded>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.config</artifactId>
<type>zip</type>
<target>/apps/mysite-vendor-packages/application/install</target>
</embedded>
<embedded>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.extensions.amp.content</artifactId>
<type>zip</type>
<target>/apps/mysite-vendor-packages/application/install</target>
</embedded>
<embedded>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.extensions.amp</artifactId>
<target>/apps/mysite-vendor-packages/application/install</target>
</embedded>
<embedded>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.examples.ui.apps</artifactId>
<type>zip</type>
<target>/apps/mysite-vendor-packages/application/install</target>
</embedded>
<embedded>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.examples.ui.content</artifactId>
<type>zip</type>
<target>/apps/mysite-vendor-packages/content/install</target>
</embedded>
    <!-- [...] -->
```

#### core POM

```xml
<!-- /core/pom.xml -->

<!-- [...] -->
<dependency>
    <groupId>com.adobe.cq</groupId>
    <artifactId>core.wcm.components.core</artifactId>
</dependency>
    <!-- [...] -->
```

#### ui.apps POM

```xml
<!-- /ui.apps/pom.xml -->

<!-- [...] -->
<plugin>
    <groupId>org.apache.jackrabbit</groupId>
    <artifactId>filevault-package-maven-plugin</artifactId>
    <configuration>
        <group>com.fi</group>
        <name>mysite.ui.apps</name>
        <packageType>application</packageType>
        <accessControlHandling>merge</accessControlHandling>
        <repositoryStructurePackages>
            <repositoryStructurePackage>
                <groupId>com.fi</groupId>
                <artifactId>mysite.ui.apps.structure</artifactId>
            </repositoryStructurePackage>
        </repositoryStructurePackages>
        <dependencies>
            <dependency>
                <groupId>com.adobe.cq</groupId>
                <artifactId>core.wcm.components.content</artifactId>
            </dependency>
            <dependency>
                <groupId>com.adobe.cq</groupId>
                <artifactId>core.wcm.components.config</artifactId>
            </dependency>
        </dependencies>
    </configuration>
</plugin>

    <!-- [...] -->

<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.core</artifactId>
</dependency>
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.content</artifactId>
<type>zip</type>
</dependency>
<dependency>
<groupId>com.adobe.cq</groupId>
<artifactId>core.wcm.components.config</artifactId>
<type>zip</type>
</dependency>
    <!-- [...] -->
```

## Extending Image Core Component

> Based on v2.15.2

Extending an AEM Dialog is (currently) possible using one of two methods. The first option extends the desired dialog /
component directly, whereas the ACS-Commons variant "pulls" the properties into a configurable namespace, which allows
sensible usage and delegation in the corresponding backend model. Both backend options will be described in Part 2 of
this mini series.

### Option 1 - slingResourceSuperType

Extending via resourceSuperType is as easy as refernecing the parent in the components .content.xml defintion

```xml

<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"

          jcr:primaryType="cq:Component"
          jcr:title="Extended Image Component"
          sling:resourceSuperType="core/wcm/components/image/v2/image"
          componentGroup="MySite - Content"/>
```

You then need to take a look at the original dialog structure, which can be found
here `/libs/core/wcm/components/image/v2/image/cq:dialog`. Copy/Paste this, remove the 'asset' and 'metadata' tab, since
these will be served from the inherited parent. You can now add your own dialog tab instead. The resulting dialog will
merge all tabs togther. Single tabs can be hidden via `sling:hideChilden` on the tabs 'items' node.

```xml

<tabs jcr:primaryType="nt:unstructured"
      sling:resourceType="granite/ui/components/coral/foundation/tabs"
      maximized="{Boolean}true">
    <items jcr:primaryType="nt:unstructured"
           sling:hideChildren="[asset]">
        <!-- [...] -->
    </items>
</tabs>
```

Using this method, all properties will be written directly to the components jcr:content node and need to be handeled
manually in your sling model. As of now, no reusable OSGi Service exists to delegate logic to.

### Option 2 - Parameterized Namespace Granite Include

Option 2 utilizes the ACS Commons
Feature [Parameterized Namespace Granite Include](https://adobe-consulting-services.github.io/acs-aem-commons/features/granite/parameterized-namespace-include/index.html)
. This allows us, to include premade dialog sections in our components dialog, as well as nesting them under a given
namespace / jcr node name. Due to this, we are able to include the same widget multiple times, as well as bundle all
properties in a single child resource and use this to automatically inject based on the inherited sling model. For us,
the latter is the important part. But more on this in Part 2.

```xml
<!-- ui.apps/src/main/content/jcr_root/apps/mysite/components/extendedimage/_cq_dialog/.content.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
          xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
          jcr:primaryType="nt:unstructured"
          jcr:title="Extended Image"
          sling:resourceType="cq/gui/components/authoring/dialog">
    <content
        jcr:primaryType="nt:unstructured"
        sling:resourceType="granite/ui/components/coral/foundation/container">
        <items jcr:primaryType="nt:unstructured">
            <tabs
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/tabs"
                maximized="{Boolean}true">
                <items jcr:primaryType="nt:unstructured">
                    <image
                        jcr:primaryType="nt:unstructured"
                        jcr:title="Asset"
                        sling:resourceType="acs-commons/granite/ui/components/include"
                        path="/libs/core/wcm/components/image/v2/image/cq:dialog/content/items/tabs/items/asset"
                        namespace="image"
                        margin="{Boolean}true"/>
                    <imageMetaData
                        jcr:primaryType="nt:unstructured"
                        jcr:title="MetaData"
                        sling:resourceType="acs-commons/granite/ui/components/include"
                        path="/libs/core/wcm/components/image/v2/image/cq:dialog/content/items/tabs/items/metadata"
                        namespace="image"
                        margin="{Boolean}true"/>
                    <ctaLinksContainer
                        jcr:primaryType="nt:unstructured"
                        jcr:title="CTAs"
                        sling:orderBefore="properties"
                        sling:resourceType="granite/ui/components/coral/foundation/container"
                        margin="{Boolean}true">
                        <items jcr:primaryType="nt:unstructured">
                            <columns
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/fixedcolumns"
                                margin="{Boolean}true">
                                <items jcr:primaryType="nt:unstructured">
                                    <column
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/coral/foundation/container">
                                        <items jcr:primaryType="nt:unstructured">
                                            <ctaLinks jcr:primaryType="nt:unstructured"
                                                      sling:resourceType="granite/ui/components/coral/foundation/form/multifield"
                                                      composite="{Boolean}true"
                                                      fieldLabel="CTA Links">
                                                <field jcr:primaryType="nt:unstructured"
                                                       sling:resourceType="granite/ui/components/coral/foundation/container"
                                                       name="./ctaLinks">
                                                    <items jcr:primaryType="nt:unstructured">
                                                        <column jcr:primaryType="nt:unstructured"
                                                                sling:resourceType="granite/ui/components/coral/foundation/container">
                                                            <items jcr:primaryType="nt:unstructured">
                                                                <title jcr:primaryType="nt:unstructured"
                                                                       fieldLabel="Title"
                                                                       sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                                                                       name="./title"/>
                                                                <path jcr:primaryType="nt:unstructured"
                                                                      sling:resourceType="granite/ui/components/coral/foundation/form/pathfield"
                                                                      fieldDescription="Target Path"
                                                                      fieldLabel="Target Path"
                                                                      rootPath="/content/mysite"
                                                                      name="./path"/>
                                                            </items>
                                                        </column>
                                                    </items>
                                                </field>
                                            </ctaLinks>
                                        </items>
                                    </column>
                                </items>
                            </columns>
                        </items>
                    </ctaLinksContainer>
                </items>
            </tabs>
        </items>
    </content>
</jcr:root>
```

If added to a page and filled with data, the jcr node will be created like and look like this

![ExtendedImageRoot](/images/aem/core-components/extended-image-root.jpg)

Due to the parameterized namespace include, all included/referenced image v2 dialog nodes will be included in
the `namespace="image"`

![ExtendedImageImage](/images/aem/core-components/extended-image-image.jpg)

All custom added properties, in our case the ctaLinks Multifield, will be in their defined jcr properties, as expected
and usual for any AEM component

![ExtendedImageCtasLinks](/images/aem/core-components/extended-image-ctalinks.jpg)

By implementing above solution, the result will look like the following image. We are reusing the inherited asset and
metadata tabs, as well as our custom added tab for cta links

![ExtendedImageTabOriginal](/images/aem/core-components/extended-image-tab-original.jpg)

![ExtendedImageTabCustom](/images/aem/core-components/extended-image-tab-custom.jpg)

Please take a look at Part 2 of this series in which we will combine core components pre written logic and our own
custom added properties.

Thanks for reading!

luca

## Links & Downloads

- [Core Components Releases](https://github.com/adobe/aem-core-wcm-components/releases)
- [JCR Package Manager](http://localhost:4502/crx/packmgr/index.jsp)
- [Core Components Library](https://www.aemcomponents.dev/)
- [Image Core Component](https://www.aemcomponents.dev/content/core-components-examples/library/page-authoring/image.html)
- [Parameterized Namespace Granite Include](https://adobe-consulting-services.github.io/acs-aem-commons/features/granite/parameterized-namespace-include/index.html)
