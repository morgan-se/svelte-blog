---
title: Understanding Spring
description: A dive into some of the finer details how Spring operates
date: '2024-12-03'
categories:
  - Java
  - Spring
  - Technical
  - Dependency Injection
published: true
---

The software engineering field is dominated by libraries and frameworks which solve the repeated problems we face as developers. Something many of us will run into are the numerous different web frameworks, each could likely have its own book written about how it all works and the design decisions made, not to mention all the content about how to use it.

I help teach SENG302, a whole year team-based project course at the University of Canterbury. Within which we use Spring (and Thymeleaf, though we wont open that box today) as our web framework of choice. In my free time I decided to dig a little deeper and get a better understanding of how it actually works.

## Whats the motivation?
You may wonder why anyone would be insane enough to want to dig deeper and get a better understanding of Spring in their free time. To some extent I would agree with you, but sometimes doing little 'side-quests' like this is just whats needed as a break from regular teaching.

Importantly to mention, its also something many new developers struggle with. There is the common understanding that we can simply build on top of these libraries and frameworks without having to worry how they work, which may be the case most of the time but if no one on your team champions the knowledge its all too common to make subpar decisions or get stumped when something doesn't work the way you expect.

Though I'm not suggesting you need to understand how every part of a framework works to develop with it, instead its important to understand the concepts at play that you directly interact with. For example many students can go the whole project without ever properly understanding Dependency Injection, Annotations, or Generics and Reflection.

So lets have a quick look at them before we try to understand how Spring applies these principles

## The fundamentals
### Dependency Injection
Dependency injection, put simply, is a technique where we provide a class with the dependencies it needs instead of having that class create them itself. This helps to decouple the creation of dependencies from our object, reducing the complexity of the object and making it easier to substitute needed dependencies.

However there are many ways to do this in practice, a simply example may be passing in any dependencies to our constructor.

```java
class DependencyA {}

class ObjectA {
    private DependencyA dependency;

    public ObjectA (DependencyA dependency) {
        this.dependency = dependency;
    }
}
```

We could then, if there is a need to supply different dependencies at runtime, abstract this to an interface.
Imagine a case where we are running a server and need to specify a path, instead of having our `Server` class decide what path to use we can pass in an object that is responsible for the path, optionally abstracting this out to use an interface so we can easily swap the path at runtime depending on if we are running locally or on a deployed server.

```java
interface CustomPath {
    String getPath();
}

class LocalPath implements CustomPath {
    public String getPath() {
        return "http://localhost:8080";
    }
}

class DeployedPath implements CustomPath {
    public String getPath() {
        return "https://example.com";
    }
}

class Server {
    private CustomPath customPath;
    public Server(CustomPath customPath) {
        this.customPath = customPath;
    }

    public static void main(String[] args) {
        Server server = new Server(new LocalPath());
    }
}
```

Whilst the example above is quite over engineered, hopefully it highlights how we can abstract out logic for dealing with the creation of dependencies. We'll take a look at a more complex and realistic example later when we see Dependency Injection in the context of Spring.

### Annotations
Annotations are a way to add extra metadata to a class, the exact implementation and name of which differs from language to language. However we'll be focussing only on Java Annotations.

Anyone who has done a bit of Java has hopefully seen the `@Test` annotation from JUnit, this simply sits atop each method in your test classes. For example:

```java
public class MyFirstTest {

    void helper() {
       // do something
    }

    @Test
    void onePlusOneEqualsTwo() {
        Assertions.assertEquals(2, 1+1);
    }
}
```

And then when we run JUnit, it just knows exactly which methods are tests, and which aren't (like our `helper` function above). We'll discuss briefly how it does that when looking at Reflection.

However one important part about Java Annotations that I want to highlight is they are simply defined in Java code. They are something you yourself can write and use in your code, not just something built into frameworks.

Lets take a look at the source for JUnits `@Test` annotation.
```java
@Target({ElementType.ANNOTATION_TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@API(
    status = Status.STABLE,
    since = "5.0"
)
@Testable
public @interface Test {
}
```

We can see the `@Test` annotation is defined with `public @interface Test`, which itself is annotated with 5 different annotations. We'll only look at `@Target` and `@Retention`, both of which provided by the `java.lang.annotations` package as these will be important later.

- The `@Target` annotation "Indicates the contexts in which an annotation interface is applicable."
  - This means we can (and should) specify what contexts (in this case other annotations and methods) the annotation is relevant for and will be enforced by the compiler.
- The `@Retention` annotation "Indicates how long annotations with the annotated interface are to be retained."
  - This allows us to define how 'long in the code compilation and execution lifecycle the annotations will be retained. In the example above (and what will be relevant to us soon) we have `RUNTIME` retention meaning the annotations will be accessible as our code is running and accessible through reflection.


### Reflection
Reflection is a debated topic in Java, often used to break the pre-defined contracts and principles laid out in code which can lead to hacky flaky solutions (though sometimes this can be the only way to achieve something, a common use case when needing to access and interact with code external to your own project). However reflection is often used with annotations, providing a more reliable structure and contract to follow.

So what is reflection? Lets start with a quick thought experiment, say we have the class

```java
class ExampleClass {
    private int anAwesomeFunction() {
        // other functionality truncated
    }
}
```

With `anAwesomeFunction` that we really want to use, and we can't make changes to that code. Here's where the dark side of reflection comes out, as long as we know the name of the function we want to call we can access it directly through reflection.
```java
ExampleClass example = new ExampleClass();
Method privateMethod = ExampleClass.class.getDeclaredMethod("anAwesomeFunction");
privateMethod.setAccessible(true);
int result = (int) privateMethod.invoke(example);
```

Importantly in the above code we use reflection to:
- Ln 2: Get the `Method` object for `anAwesomeFunction`
- Ln 3: Make the method accessible (so we can subsequently call it)
- Ln 4: Invoke the method and get its output

Though reflection is much more powerful than just this example which we'll see in practice soon.


## Putting it all together to create a Spring Clone

### Custom annotations
Those with experience in Swing will be familiar with its custom annotations, the ones we'll use for our spring clone are `@Component`, `@Autowired` and `@RequestMapping`.

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Component {}
```
The Component annotation is simply used to define what classes (since our `@Target` is `TYPE`) are considered 'components' of the app, in our case only for controllers and service classes which we have combined for simplicity. We then use this meta-data to know what classes can be instantiated at runtime.

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.CONSTRUCTOR)
public @interface Autowired {}
```
<!-- Could make a short post about constructor dependency injection vs field injection to link below.  -->
The Autowired annotation is a very common annotation in Spring (though our version only works on constructors, since constructor dependency injection is superior to field injection), that mark a constructor for dependency injected

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RequestMapping {
    HttpMethod method();
    String path();
}
```

Finally the RequestMapping annotation is used on a method to tell our framework that the method can handle HTTP requests. We even see here that the annotation interface has two functions.

### Finding annotated classes
Above we introduced the `@Component` annotation to be used on classes, in our case we use this so we can find those classes at runtime. The example code below shows a generic implementation that finds all classes with any of the given `annotations`. 

```java
public class ComponentScanner {
    public static List<Class<?>> scanForAnnotatedClasses(String packageName, List<Class<? extends Annotation>> annotations) throws IOException, ClassNotFoundException {
        List<Class<?>> annotatedClasses = new ArrayList<>();
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        String path = packageName.replace('.', '/');
        Enumeration<URL> resources = classLoader.getResources(path);

        while (resources.hasMoreElements()) {
            URL resource = resources.nextElement();
            List<Class<?>> classes = ClassFinder.find(resource, packageName);
            for (Class<?> c : classes) {
                for (Class<? extends Annotation> annotation : annotations) {
                    if (c.isAnnotationPresent(annotation)) {
                        annotatedClasses.add(c);
                    }
                }
            }
        }
        return annotatedClasses;
    }
}
```

Importantly above we get all the classes with `ClassFinder.find()` and then check if they have any of the relevant annotations with `c.isAnnotationPresent()`. The `ClassFinder` class is copied below as well.

```java
public class ClassFinder {
    public static List<Class<?>> find(URL url, String packageName) throws ClassNotFoundException {
        List<Class<?>> classes = new ArrayList<>();
        String protocol = url.getProtocol();

        if ("file".equals(protocol)) {
            String packagePath = packageName.replace('.', '/');
            String filePath = url.getPath();
            findClassesInDirectory(new File(filePath), packagePath, classes);
        } else if ("jar".equals(protocol)) {
            // Handle JAR file scanning, left as an exercise for the reader
        }
        return classes;
    }

    private static void findClassesInDirectory(File directory, String packagePath, List<Class<?>> classes) throws ClassNotFoundException {
        if (!directory.exists()) {
            return;
        }
        File[] files = directory.listFiles();
        if (files == null) {
            return;
        }
        for (File file : files) {
            if (file.isDirectory()) {
                findClassesInDirectory(file, packagePath + "/" + file.getName(), classes);
            } else if (file.getName().endsWith(".class")) {
                String className = packagePath + "." + file.getName().substring(0, file.getName().length() - 6);
                if (className.startsWith("/")) {
                    className = className.substring(1);
                }
                className = className.replace("/", ".");
                classes.add(Class.forName(className));
            }
        }
    }
}
```


### The bread and butter of our framework and Dependency Injection
All of this is then called from our `SimpleServe` class, which implements the Singleton pattern and gets all classes from the root package or below that have the `@Component` annotation and calls out to the `DIContainer` class to initialize all the classes (handling the dependency injection). Using the Singleton pattern allows for easy access to our `handleRequest` method that we'll see more of later.

```java
public class SimpleServe {
    private static SimpleServe instance;

    public static SimpleServe getInstance() {
        if (instance == null) {
            try {
                instance = new SimpleServe(
                        ComponentScanner.scanForAnnotatedClasses(
                                "",
                                List.of(Component.class)
                        )
                );
            } catch (IOException | ClassNotFoundException e) {
                throw new RuntimeException(e);
            }
        }
        return instance;
    }

    private final DIContainer DIContainer = new DIContainer();

    public SimpleServe(List<Class<?>> classes) {
        DIContainer.registerAll(classes);
        DIContainer.autowireAll();
    }

    public HttpResponse handleRequest(HttpRequest request) {
        try {
            for (Class<?> clazz : DIContainer.getClasses()) {
                Method[] methods = clazz.getMethods();
                for (Method method : methods) {
                    if (method.isAnnotationPresent(RequestMapping.class)) {
                        RequestMapping mapping = method.getAnnotation(RequestMapping.class);
                        if (mapping.method().equals(request.getMethod()) && mapping.path().equals(request.getPath())) {
                            return (HttpResponse) method.invoke(DIContainer.getInstances().get(clazz), request);
                        }
                    }
                }
            }
            return new HttpResponse(404, "Not found", "");
        } catch (InvocationTargetException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
```

The `DIContainer` class below is quite complex, given a set of classes it will loop through them and try to initialize them using their `@Autowired` constructor. We put this all inside a do..while loop since we want to loop over creation until we go a whole loop without initializing a new class, if this happens we should have initialized all possible classes and means we don't have to worry about dependency order.

```java
public class DIContainer {
    private final Map<Class<?>, Object> instances = new HashMap<>();
    private final Set<Class<?>> classes = new HashSet<>();

    public void registerAll(List<Class<?>> clazz) {
        classes.addAll(clazz);
    }


    public Set<Class<?>> getClasses() {
        return classes;
    }

    public Map<Class<?>, Object> getInstances() {
        return instances;
    }

    public void autowireAll() {
        boolean created;
        do {
            created = false;
            for (Class<?> clazz : classes) {
                if (!instances.containsKey(clazz)) {
                    try {
                        autowire(clazz);
                        created = true;
                    } catch (Exception ignored) {
                        // Ignored intentionally (should do some logging)
                    }
                }
            }
        } while (created);
        if (instances.keySet().size() != classes.size()) {
            throw new IllegalStateException("Autowiring failed: Not all classes were instantiated.");
        }
    }

    public void autowire(Class<?> clazz) {
        Constructor<?>[] constructors = clazz.getDeclaredConstructors();
        for (Constructor<?> constructor : constructors) {
            if (constructor.isAnnotationPresent(Autowired.class)) {
                Class<?>[] parameterTypes = constructor.getParameterTypes();
                Object[] dependencies = new Object[parameterTypes.length];
                for (int i = 0; i < parameterTypes.length; i++) {
                    dependencies[i] = instances.get(parameterTypes[i]);
                    if (dependencies[i] == null) {
                        throw new RuntimeException("No instance found for type: " + parameterTypes[i]);
                    }
                }

                try {
                    constructor.setAccessible(true);
                    Object instance = constructor.newInstance(dependencies);
                    instances.put(clazz, instance);
                } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
                    e.printStackTrace();
                }
                return;
            }
        }
        throw new RuntimeException("No @Autowired constructor found for class: " + clazz);
    }
}
```

In the main class of our application we create the `SimpleServe` singleton and start listening to a defined port and assign any request that comes in its own thread from a pool.

```java
public class SimpleServer {
    private final int port;
    private final ExecutorService threadPool;

    public SimpleServer(int port, int threadPoolSize) {
        this.port = port;
        threadPool = Executors.newFixedThreadPool(threadPoolSize);
        SimpleServe.getInstance();
    }

    public void listen() {
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Server started on port " + port);
            while (true) {
                try {
                    Socket clientSocket = serverSocket.accept();
                    threadPool.submit(new RequestHandler(clientSocket));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        SimpleServer simpleServer = new SimpleServer(8080, 10);
        simpleServer.listen();
    }
}
```

### Our example component classes
In our example we only include a simple controller and service pair as an example, aptly named `ExampleController` and `ExampleService`.

```java
@Component
public class ExampleController {
    private final ExampleService exampleService;

    @Autowired
    public ExampleController(ExampleService exampleService) {
        this.exampleService = exampleService;
    }

    @RequestMapping(method = HttpMethod.GET, path = "/")
    public HttpResponse handleRequest(HttpRequest request) {
        String message = exampleService.getMessage();

        return new HttpResponse(200, "OK", message);
    }
}
```

```java
@Component
public class ExampleService {

    @Autowired
    public ExampleService() {
    }

    public String getMessage() {
        return "Hello from the service layer o/";
     }
}
```

Here our `ExampleService` has an `@Autowired` constructor that requires an instance of `ExampleService` to be injected into it. More complex autowired constructors are allowed, including having constructors depend on multiple services or services depend on other services *as long as there are no cyclical dependencies*


### Handling Requests
Now that we have our our framework creating the required controller and service classes we need to somehow handle the HTTP requests that come in and assign them to the right controller method so we can send a response. This part has also been done from scratch, however corners have been cut to simplify the HTTP interactions.


Firstly we have a simple Enum class to represent the HTTP method of a request
```java
public enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE,
    HEAD,
    OPTIONS,
    TRACE,
    PATCH,
    CONNECT;

    public String getMethod() {
        return name();
    }

    @Override
    public String toString() {
        return getMethod();
    }

    public static HttpMethod fromString(String method) {
        return HttpMethod.valueOf(method.toUpperCase());
    }
}
```

We then model an HTTP request as a simple collection of strings that represent the path (URI), header and body. Though each of these components could be further specialized (for example recording and storing headers individually or reading the body as a specific format based on such headers)
```java
public class HttpRequest {
    private HttpMethod method;
    private String path;
    private String header;
    private String body;

    public HttpRequest(HttpMethod method, String path, String header, String body) {
        this.method = method;
        this.path = path;
        this.header = header;
        this.body = body;
    }

    public HttpMethod getMethod() {
        return method;
    }

    public String getPath() {
        return path;
    }

    public String getHeader() {
        return header;
    }

    public String getBody() {
        return body;
    }
}
```


Each request is then parsed by the `RequestHandler` class. In this example we are only getting the method and URI from the HTTP request sent in. Both stored space-separated in the first line of the request buffer. After this come lines for each header and the body content (however we'll just leave these blank in our example). 

```java
public class RequestHandler implements Runnable {
    private Socket clientSocket;

    public RequestHandler(Socket socket) {
        this.clientSocket = socket;
    }

    @Override
    public void run() {
        try (
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                OutputStream os = clientSocket.getOutputStream();
                PrintWriter out = new PrintWriter(os, true)
        ) {
            String request = in.readLine();
            request.split(" ");
            String method = request.split(" ")[0];
            String uri = request.split(" ")[1];
            
            HttpRequest httpRequest = new HttpRequest(HttpMethod.fromString(method), uri, "", "");
            HttpResponse httpResponse = SimpleServe.getInstance().handleRequest(httpRequest);
            ResponseParser.parseResponseToOutput(httpResponse, out);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (clientSocket != null && !clientSocket.isClosed()) {
                    clientSocket.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

Above we see the aforementioned `SimpleServe.handleRequest()` which gets passed the `httpRequest` object and returns an `HttpResponse` object that we will send back to the client. Let's take a look at that method again.

```java
public HttpResponse handleRequest(HttpRequest request) {
    try {
        for (Class<?> clazz : DIContainer.getClasses()) {
            Method[] methods = clazz.getMethods();
            for (Method method : methods) {
                if (method.isAnnotationPresent(RequestMapping.class)) {
                    RequestMapping mapping = method.getAnnotation(RequestMapping.class);
                    if (mapping.method().equals(request.getMethod()) && mapping.path().equals(request.getPath())) {
                        return (HttpResponse) method.invoke(clazz, request);
                    }
                }
            }
        }
        return new HttpResponse(404, "Not found", "");
    } catch (InvocationTargetException | IllegalAccessException e) {
        throw new RuntimeException(e);
    }
}
```

Above we see that when a request is handled we simply look through all the instantiated classes (which include all our controllers) and check each method therein to see if they are annotated with `@RequestMapping` and have the method and path that match the incoming request. Otherwise simply return a 404 Not Found response.

### Sending a response back to the client
Finally lets take a look at how we send our `HttpResponse` back to the client.

We have a simple class `HttpResponse` to represent a response we want to send to the client. This includes a status code and message as well as a body. Notably the ability to define headers is missing here for simplicity.
```java
public class HttpResponse {
    private final int statusCode;
    private final String statusMessage;
    private final Object body;

    public HttpResponse(int statusCode, String statusMessage, Object body) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.body = body;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public String getBody() {
        return body.toString();
    }
}

```

The `ResponseParser` class handles returning an `HttpResponse` to the client, again this class is only partially implemented for simplicity. Here we hard code much of the HTTP packet we are going to send, including some some headers to define body type and size.

```java
public class ResponseParser {
    public static void parseResponseToOutput(HttpResponse httpResponse, PrintWriter printWriter){
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("HTTP/1.1 %d %s\r\n", httpResponse.getStatusCode(), httpResponse.getStatusMessage()));
        sb.append("Content-Type: text/plain\r\n");
        sb.append(String.format("Content-Length: %d\r\n", httpResponse.getBody().length()));
        sb.append("\r\n");
        sb.append(httpResponse.getBody());

        printWriter.print(sb);
    }
}
```

### Sending a request
Our 'spring-like' framework is now complete, of course our HTTP implementation leaves much to be desired but its enough to try some simple get requests.

A simple `GET` request to `/` will give the following
![Example GET request](../simple-serve-get.png)

And a `GET` request to a url that has no mapped response gives
![Example GET request](../simple-serve-get-notfound.png)

## Wrapping up
Hopefully breaking down web frameworks to there smallest parts has given you a better understanding of how Spring and other web frameworks actually work under the hood. For those interested the code can be found at [https://gitlab.com/morgan.english.seng/simple-serve/](https://gitlab.com/morgan.english.seng/simple-serve/), do have a play around trying to create more controllers and services or implementing a more complete HTTP service.

