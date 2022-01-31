# Local Development Setup

This posts describes the steps and software requirements one needs to follow, to create and setup a working, local AEM
instance. Secondly, an example of using the "Maven Archetype" provides the necessary basics to bootstrap a new AEM
project according to the best practices.

## TL:DR

1. Install Java
    1. [Download JDK](https://adoptopenjdk.net/)
    2. Add to $PATH
2. Login with Adobe Account & Download AEM
    1. [Adobe Software Distribution](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html)
    2. e.g AEM SDK v2021.3.5087.20210322T071003Z-210325
       1. Note, AEM Changed its Versioning for Cloud to `year + version + timestamp`.
    3. extract archive
    4. rename to `cq-author-p4502.jar`
       1. If you want to start a local publisher, name it to `cq-publish-p4503`.
       2. You can change the number to any valid port, if you have something already running and blocking that specific port.
3. Start AEM Instance
    1. `java -jar cq-author-p4502.jar`
    2. wait 1-5 minutes (Newer Versions of AEM start a lot quicker, than e.g 6.3 or 6.4)
4. Install Maven
    1. [Download](https://maven.apache.org/download.cgi)
    2. Add to $PATH
5. Execute [Maven Archetype Command](#bootstrapping-a-development-environment-via-maven-archetype)
    1. `cd ./mysite`
    2. `mvn clean install -PautoInstallSinglePackage`
6. Access [http://localhost:4502](http://localhost:4502) and login via admin:admin

## Requirements

The following section describes the software needed to run a local AEM instance, as well as being able to start
extending and customizing AEM.

### AEM

This setup works for all latest major AEM Versions, including AEM as a Cloud Service, which is Adobes latest AEM
offering. The Cloud SDK and 6.5 are in active development and receive new features on a regular basis. The Cloud SDK is
being versioned via timestamps, such as `aem-sdk-2021.3.5026.20210309T210727Z-210225`, while the AEM On-Premise and
Managed Services offerings still bear the classic `major.minor.patch` level notation.

### Tools

- Java JDK
    - JDK v11 ->  AEM Cloud SDK + AEM ≥6.5
    - JDK v8 -> AEM ≤6.4
- Maven ≥3.39
- AEM-Repo Tool
    - Optional -> Conveniently push/pull content to the local JCR (AEMs Database)
- NodeJS + NPM
    - Optional -> Required, if one wants to use the SPA Framework (React / Angular Components)

## Setup

A local development setup consists of two parts. One, the actual AEM instance (java process) running and secondly

### Running AEM locally

After downloading the desired AEM Version from
the [Adobe Software Distribution](https://experience.adobe.com/#/downloads/content/software-distribution/en/aemcloud.html)
, extract the archive - if the cloud sdk has been downloaded. Otherwise, we can directly run the jar.

By renaming the jar according to the following schema, a couple of default settings can be
set: `cq-(author|publish)-p(port)`. For example `cq-author-p4502`. When started, this will run the AEM instance as an
author and expose it locally via port 4502.

Running the jar is as easy as executing it like this: `java -jar my-downloaded-aem.jar -gui`. The parameter `-gui` can
be appended, to launch an additional small UI, which informs the user about the startup / installation progress.
Additionally, `-gui` will automatically set the default admin users credentials to `admin:admin`.

### Bootstrapping a development environment via Maven Archetype

The Apache Maven Archetype describes Archetypes like this

> [...] provide a system that provides a consistent means of generating Maven projects. Archetype will help authors create Maven project templates for users, and provides users with the means to generate parameterized versions of those project templates.

To summarize, by using an archetype, which itself has been created by the AEM Developer Team, we can set specific
variables with which the archetypes bootstraps / creates a customized set of files and directories - ready to use.

The following example demonstrates a bash command using the v27 of the aem-project-archetype. By setting 'appTitle', '
appId' and 'groupId' we tell the Archetype how it should name and structure our packages. 'frontendModule' can be one
of ['none', 'general', 'react', 'angular']. By specifying this parameter, we can opt in to use the (new) ui.frontend
module, which itself can be preconfigured with either a "classic" html variant, or one of the modern Javascript SPA
Frameworks - currently only React and Angular are supported.

If we do not specify an 'aemVersion' the latest AEM Cloud Sdk will be used. A specific version can be set via passing
the AEM version in its major.minor.patch level notation. For example 'aemVersion="6.4.8' would create the archetype
based on AEM 6.4 with Patch Level 8 and add all necessary dependencies to the pom.xml.

```bash
mvn -B archetype:generate \
 -D archetypeGroupId=com.adobe.aem \
 -D archetypeArtifactId=aem-project-archetype \
 -D archetypeVersion=27 \
 -D appTitle="My Site" \
 -D appId="mysite" \
 -D groupId="com.mysite" \
 -D frontendModule=react \
 -D includeExamples=y
```

The Archetype provides a wide range of optional properties, with sensible defaults set for each. For a list of all
available settings, please check
the [official documentation](https://github.com/adobe/aem-project-archetype#available-properties) on GitHub.

Executing the above command will create the following folder structure

```bash
Using AEM as a Cloud Service SDK version: 2021.3.5087.20210322T071003Z-210325
Creating content skeleton...
[INFO] Project created from Archetype in dir: /Users/nerlich/Downloads/temp/mysite
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  10.865 s
[INFO] Finished at: 2021-03-27T20:54:40+01:00
[INFO] ------------------------------------------------------------------------
```

`cd mysite`

```bash
-rw-r--r--   1 nerlich  staff  1.2K .gitignore
-rw-r--r--   1 nerlich  staff   11K LICENSE
-rw-r--r--   1 nerlich  staff  5.2K README.md
drwxr-xr-x   4 nerlich  staff  128B all/
drwxr-xr-x   3 nerlich  staff   96B analyse/
-rw-r--r--   1 nerlich  staff  494B archetype.properties
drwxr-xr-x   4 nerlich  staff  128B core/
drwxr-xr-x   6 nerlich  staff  192B dispatcher/
drwxr-xr-x   4 nerlich  staff  128B it.tests/
-rw-r--r--   1 nerlich  staff   28K pom.xml
drwxr-xr-x   5 nerlich  staff  160B ui.apps/
drwxr-xr-x   4 nerlich  staff  128B ui.apps.structure/
drwxr-xr-x   4 nerlich  staff  128B ui.config/
drwxr-xr-x   4 nerlich  staff  128B ui.content/
drwxr-xr-x  12 nerlich  staff  384B ui.frontend/
drwxr-xr-x  11 nerlich  staff  352B ui.tests/
```

Building and deploying the complete development environment can be done via the following
command `mvn clean install -PautoInstallSinglePackage` - executed in the root directory.

`ui.apps`, `ui.config` and `ui.content` can be individually build with the profile `-PautoInstallPackage`. Deploying just the
java module 'core' can be achieved with the profile `-PautoInstallBundle`.

> I usually just run `mvn clean install -PautoInstallPackage` in my projects root. The deployment is quick enough, and I can be sure, that I did not miss anything.

Thanks for reading!

luca

## Links & Downloads

- [AEM Software Distribution](https://experience.adobe.com/#/downloads)
    - The official Adobe Experience Cloud Download Hub
- [Official AEM Archetype GitHub Page](https://github.com/adobe/aem-project-archetype)
- [AEM Core Components](https://github.com/adobe/aem-core-wcm-components)
- [AEM ACS Commons](https://adobe-consulting-services.github.io/acs-aem-commons/)
