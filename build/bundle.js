
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? undefined : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.23.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\convertGravityComponent.svelte generated by Svelte v3.23.2 */

    const file = "src\\convertGravityComponent.svelte";

    function create_fragment(ctx) {
    	let br0;
    	let div0;
    	let input0;
    	let t0;
    	let p0;
    	let t2;
    	let br1;
    	let t3;
    	let div1;
    	let input1;
    	let t4;
    	let p1;
    	let br2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "Specific Gravity";
    			t2 = space();
    			br1 = element("br");
    			t3 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "°P";
    			br2 = element("br");
    			add_location(br0, file, 17, 0, 286);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "input1");
    			attr_dev(input0, "name", "input");
    			attr_dev(input0, "max", "1.629");
    			attr_dev(input0, "maxlength", "2");
    			add_location(input0, file, 18, 0, 311);
    			attr_dev(p0, "class", "smallBlack");
    			add_location(p0, file, 19, 4, 441);
    			attr_dev(div0, "class", "unit1");
    			add_location(div0, file, 17, 4, 290);
    			add_location(br1, file, 20, 6, 493);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "input1");
    			attr_dev(input1, "name", "input");
    			attr_dev(input1, "max", "100");
    			attr_dev(input1, "maxlength", "2");
    			add_location(input1, file, 23, 0, 522);
    			attr_dev(p1, "class", "smallBlack");
    			add_location(p1, file, 24, 4, 644);
    			attr_dev(div1, "class", "unit2");
    			add_location(div1, file, 22, 0, 501);
    			add_location(br2, file, 24, 45, 685);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, /*standard*/ ctx[0]);
    			append_dev(div0, t0);
    			append_dev(div0, p0);
    			append_dev(div0, t2);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, /*plato*/ ctx[1]);
    			append_dev(div1, t4);
    			append_dev(div1, p1);
    			insert_dev(target, br2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input0, "input", /*convertStandard*/ ctx[2], false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input1, "input", /*convertPlato*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*standard*/ 1 && to_number(input0.value) !== /*standard*/ ctx[0]) {
    				set_input_value(input0, /*standard*/ ctx[0]);
    			}

    			if (dirty & /*plato*/ 2 && to_number(input1.value) !== /*plato*/ ctx[1]) {
    				set_input_value(input1, /*plato*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(br2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { standard = 1.059 } = $$props;
    	let plato = (259 - 259 / standard).toFixed(3);

    	function convertStandard() {
    		$$invalidate(1, plato = (259 - 259 / standard).toFixed(3));
    		$$invalidate(1, plato);
    	}

    	function convertPlato() {
    		$$invalidate(0, standard = (259 / (259 - plato)).toFixed(3));
    		$$invalidate(0, standard);
    	}

    	const writable_props = ["standard"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ConvertGravityComponent> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ConvertGravityComponent", $$slots, []);

    	function input0_input_handler() {
    		standard = to_number(this.value);
    		$$invalidate(0, standard);
    	}

    	function input1_input_handler() {
    		plato = to_number(this.value);
    		$$invalidate(1, plato);
    	}

    	$$self.$set = $$props => {
    		if ("standard" in $$props) $$invalidate(0, standard = $$props.standard);
    	};

    	$$self.$capture_state = () => ({
    		standard,
    		plato,
    		convertStandard,
    		convertPlato
    	});

    	$$self.$inject_state = $$props => {
    		if ("standard" in $$props) $$invalidate(0, standard = $$props.standard);
    		if ("plato" in $$props) $$invalidate(1, plato = $$props.plato);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		standard,
    		plato,
    		convertStandard,
    		convertPlato,
    		input0_input_handler,
    		input1_input_handler
    	];
    }

    class ConvertGravityComponent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { standard: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConvertGravityComponent",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get standard() {
    		throw new Error("<ConvertGravityComponent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set standard(value) {
    		throw new Error("<ConvertGravityComponent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\abvCalculator.svelte generated by Svelte v3.23.2 */
    const file$1 = "src\\abvCalculator.svelte";

    function create_fragment$1(ctx) {
    	let h4;
    	let t1;
    	let label0;
    	let br0;
    	let t3;
    	let gravityconvert0;
    	let updating_standard;
    	let br1;
    	let t4;
    	let label1;
    	let br2;
    	let t6;
    	let gravityconvert1;
    	let updating_standard_1;
    	let t7;
    	let br3;
    	let t8;
    	let label2;
    	let t10;
    	let br4;
    	let t11;
    	let br5;
    	let t12;
    	let div0;
    	let span1;
    	let t13_value = ((/*OGS*/ ctx[0] - /*FGS*/ ctx[1]) * 131.25).toFixed(3) + "";
    	let t13;
    	let span0;
    	let br6;
    	let t15;
    	let div1;
    	let span3;
    	let t16_value = ((/*OGS*/ ctx[0] - /*FGS*/ ctx[1]) / (/*OGS*/ ctx[0] - 1) * 100).toFixed(3) + "";
    	let t16;
    	let span2;
    	let br7;
    	let t18;
    	let p;
    	let span4;
    	let t20;
    	let current;

    	function gravityconvert0_standard_binding(value) {
    		/*gravityconvert0_standard_binding*/ ctx[2].call(null, value);
    	}

    	let gravityconvert0_props = {};

    	if (/*OGS*/ ctx[0] !== void 0) {
    		gravityconvert0_props.standard = /*OGS*/ ctx[0];
    	}

    	gravityconvert0 = new ConvertGravityComponent({
    			props: gravityconvert0_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(gravityconvert0, "standard", gravityconvert0_standard_binding));

    	function gravityconvert1_standard_binding(value) {
    		/*gravityconvert1_standard_binding*/ ctx[3].call(null, value);
    	}

    	let gravityconvert1_props = {};

    	if (/*FGS*/ ctx[1] !== void 0) {
    		gravityconvert1_props.standard = /*FGS*/ ctx[1];
    	}

    	gravityconvert1 = new ConvertGravityComponent({
    			props: gravityconvert1_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(gravityconvert1, "standard", gravityconvert1_standard_binding));

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "ABV calculator";
    			t1 = space();
    			label0 = element("label");
    			label0.textContent = "Original Gravity:";
    			br0 = element("br");
    			t3 = space();
    			create_component(gravityconvert0.$$.fragment);
    			br1 = element("br");
    			t4 = space();
    			label1 = element("label");
    			label1.textContent = "Final Gravity: ";
    			br2 = element("br");
    			t6 = space();
    			create_component(gravityconvert1.$$.fragment);
    			t7 = space();
    			br3 = element("br");
    			t8 = space();
    			label2 = element("label");
    			label2.textContent = "Result:";
    			t10 = space();
    			br4 = element("br");
    			t11 = space();
    			br5 = element("br");
    			t12 = space();
    			div0 = element("div");
    			span1 = element("span");
    			t13 = text(t13_value);
    			span0 = element("span");
    			span0.textContent = "% ABV";
    			br6 = element("br");
    			t15 = space();
    			div1 = element("div");
    			span3 = element("span");
    			t16 = text(t16_value);
    			span2 = element("span");
    			span2.textContent = "% Attenuation";
    			br7 = element("br");
    			t18 = space();
    			p = element("p");
    			span4 = element("span");
    			span4.textContent = "Note:";
    			t20 = text(" Plato, brix, and balling are all very close to the same thing. They're all essentially the strenth of a solution as a percentage by mass. Plato corrects some minor errors in the brix scale, starting in the fifth decimal place, where brix was originally invented to correct similar errors in the balling scale, which is the oldest.");
    			attr_dev(h4, "class", "mono gray");
    			add_location(h4, file$1, 13, 4, 144);
    			add_location(label0, file$1, 16, 0, 194);
    			add_location(br0, file$1, 16, 32, 226);
    			add_location(br1, file$1, 17, 37, 269);
    			add_location(label1, file$1, 18, 0, 275);
    			add_location(br2, file$1, 18, 30, 305);
    			add_location(br3, file$1, 22, 0, 354);
    			add_location(label2, file$1, 23, 0, 360);
    			add_location(br4, file$1, 24, 0, 385);
    			add_location(br5, file$1, 25, 0, 391);
    			attr_dev(span0, "class", "smallBlack");
    			add_location(span0, file$1, 30, 60, 486);
    			attr_dev(span1, "class", "answerText");
    			add_location(span1, file$1, 30, 0, 426);
    			add_location(br6, file$1, 30, 104, 530);
    			attr_dev(div0, "class", "answers");
    			add_location(div0, file$1, 27, 0, 399);
    			attr_dev(span2, "class", "smallBlack");
    			add_location(span2, file$1, 37, 67, 643);
    			attr_dev(span3, "class", "answerText");
    			add_location(span3, file$1, 37, 0, 576);
    			add_location(br7, file$1, 37, 119, 695);
    			attr_dev(div1, "class", "answers2");
    			add_location(div1, file$1, 35, 0, 550);
    			attr_dev(span4, "class", "medium green");
    			add_location(span4, file$1, 44, 7, 730);
    			add_location(p, file$1, 44, 4, 727);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, label0, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(gravityconvert0, target, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, label1, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(gravityconvert1, target, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, br3, anchor);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, label2, anchor);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, br4, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, br5, anchor);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, span1);
    			append_dev(span1, t13);
    			append_dev(span1, span0);
    			append_dev(div0, br6);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span3);
    			append_dev(span3, t16);
    			append_dev(span3, span2);
    			append_dev(div1, br7);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, span4);
    			append_dev(p, t20);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const gravityconvert0_changes = {};

    			if (!updating_standard && dirty & /*OGS*/ 1) {
    				updating_standard = true;
    				gravityconvert0_changes.standard = /*OGS*/ ctx[0];
    				add_flush_callback(() => updating_standard = false);
    			}

    			gravityconvert0.$set(gravityconvert0_changes);
    			const gravityconvert1_changes = {};

    			if (!updating_standard_1 && dirty & /*FGS*/ 2) {
    				updating_standard_1 = true;
    				gravityconvert1_changes.standard = /*FGS*/ ctx[1];
    				add_flush_callback(() => updating_standard_1 = false);
    			}

    			gravityconvert1.$set(gravityconvert1_changes);
    			if ((!current || dirty & /*OGS, FGS*/ 3) && t13_value !== (t13_value = ((/*OGS*/ ctx[0] - /*FGS*/ ctx[1]) * 131.25).toFixed(3) + "")) set_data_dev(t13, t13_value);
    			if ((!current || dirty & /*OGS, FGS*/ 3) && t16_value !== (t16_value = ((/*OGS*/ ctx[0] - /*FGS*/ ctx[1]) / (/*OGS*/ ctx[0] - 1) * 100).toFixed(3) + "")) set_data_dev(t16, t16_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gravityconvert0.$$.fragment, local);
    			transition_in(gravityconvert1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gravityconvert0.$$.fragment, local);
    			transition_out(gravityconvert1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(label0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t3);
    			destroy_component(gravityconvert0, detaching);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(label1);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t6);
    			destroy_component(gravityconvert1, detaching);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(br3);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(label2);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(br4);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(br5);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let OGS = 1.062;
    	let FGS = 1.012;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AbvCalculator> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("AbvCalculator", $$slots, []);

    	function gravityconvert0_standard_binding(value) {
    		OGS = value;
    		$$invalidate(0, OGS);
    	}

    	function gravityconvert1_standard_binding(value) {
    		FGS = value;
    		$$invalidate(1, FGS);
    	}

    	$$self.$capture_state = () => ({ GravityConvert: ConvertGravityComponent, OGS, FGS });

    	$$self.$inject_state = $$props => {
    		if ("OGS" in $$props) $$invalidate(0, OGS = $$props.OGS);
    		if ("FGS" in $$props) $$invalidate(1, FGS = $$props.FGS);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [OGS, FGS, gravityconvert0_standard_binding, gravityconvert1_standard_binding];
    }

    class AbvCalculator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AbvCalculator",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\convertApp.svelte generated by Svelte v3.23.2 */
    const file$2 = "src\\convertApp.svelte";

    function create_fragment$2(ctx) {
    	let h4;
    	let t1;
    	let gravityconvert;
    	let t2;
    	let p;
    	let span;
    	let t4;
    	let current;
    	gravityconvert = new ConvertGravityComponent({ $$inline: true });

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "gravity unit converter";
    			t1 = space();
    			create_component(gravityconvert.$$.fragment);
    			t2 = space();
    			p = element("p");
    			span = element("span");
    			span.textContent = "Note:";
    			t4 = text(" Plato, brix, and balling are all very close to the same thing. They're all essentially the strenth of a solution as a percentage by mass. Plato corrects some minor errors in the brix scale, starting in the fifth decimal place, where brix was originally invented to correct similar errors in the balling scale, which is the oldest.");
    			attr_dev(h4, "class", "mono gray");
    			add_location(h4, file$2, 6, 0, 90);
    			attr_dev(span, "class", "medium green");
    			add_location(span, file$2, 11, 3, 173);
    			add_location(p, file$2, 11, 0, 170);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(gravityconvert, target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, span);
    			append_dev(p, t4);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gravityconvert.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gravityconvert.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			destroy_component(gravityconvert, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ConvertApp> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ConvertApp", $$slots, []);
    	$$self.$capture_state = () => ({ GravityConvert: ConvertGravityComponent });
    	return [];
    }

    class ConvertApp extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConvertApp",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\lmeDMEcalc.svelte generated by Svelte v3.23.2 */

    const file$3 = "src\\lmeDMEcalc.svelte";

    function create_fragment$3(ctx) {
    	let h4;
    	let t1;
    	let div0;
    	let input0;
    	let t2;
    	let p0;
    	let br0;
    	let t4;
    	let div1;
    	let input1;
    	let t5;
    	let p1;
    	let br1;
    	let t7;
    	let br2;
    	let t8;
    	let p2;
    	let span;
    	let t10;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Swap Liquid Malt Extract (LME) and Dry Malt Extract (DME)";
    			t1 = space();
    			div0 = element("div");
    			input0 = element("input");
    			t2 = space();
    			p0 = element("p");
    			p0.textContent = "lbs LME";
    			br0 = element("br");
    			t4 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "lbs DME";
    			br1 = element("br");
    			t7 = space();
    			br2 = element("br");
    			t8 = space();
    			p2 = element("p");
    			span = element("span");
    			span.textContent = "Note:";
    			t10 = text(" Because liquid malt extract contains more water than dry malt extract, when you switch out the two in a recipe, you need to use more LME than you would DME to make up for that water weight.");
    			attr_dev(h4, "class", "mono gray");
    			add_location(h4, file$3, 51, 0, 1745);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "input1");
    			attr_dev(input0, "name", "input");
    			attr_dev(input0, "max", "1.629");
    			add_location(input0, file$3, 55, 0, 1856);
    			attr_dev(p0, "class", "smallBlack");
    			add_location(p0, file$3, 56, 4, 1960);
    			attr_dev(div0, "class", "unit1");
    			add_location(div0, file$3, 54, 0, 1835);
    			add_location(br0, file$3, 56, 45, 2001);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "input1");
    			attr_dev(input1, "name", "input");
    			attr_dev(input1, "max", "100");
    			add_location(input1, file$3, 58, 0, 2028);
    			attr_dev(p1, "class", "smallBlack");
    			add_location(p1, file$3, 59, 0, 2126);
    			attr_dev(div1, "class", "unit2");
    			add_location(div1, file$3, 57, 0, 2007);
    			add_location(br1, file$3, 59, 42, 2168);
    			add_location(br2, file$3, 60, 0, 2174);
    			attr_dev(span, "class", "medium green");
    			add_location(span, file$3, 63, 7, 2191);
    			add_location(p2, file$3, 63, 4, 2188);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, /*lme*/ ctx[0]);
    			append_dev(div0, t2);
    			append_dev(div0, p0);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, /*dme*/ ctx[1]);
    			append_dev(div1, t5);
    			append_dev(div1, p1);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, span);
    			append_dev(p2, t10);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input0, "input", /*startLME*/ ctx[2], false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input1, "input", /*startDME*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*lme*/ 1 && to_number(input0.value) !== /*lme*/ ctx[0]) {
    				set_input_value(input0, /*lme*/ ctx[0]);
    			}

    			if (dirty & /*dme*/ 2 && to_number(input1.value) !== /*dme*/ ctx[1]) {
    				set_input_value(input1, /*dme*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(p2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let lme = 5;
    	let dme = (lme * (36 / 43)).toFixed(3);

    	function startLME() {
    		$$invalidate(1, dme = (lme * (36 / 43)).toFixed(3));
    		$$invalidate(1, dme);
    	}

    	function startDME() {
    		$$invalidate(0, lme = (dme * (43 / 36)).toFixed(3));
    		$$invalidate(0, lme);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LmeDMEcalc> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("LmeDMEcalc", $$slots, []);

    	function input0_input_handler() {
    		lme = to_number(this.value);
    		$$invalidate(0, lme);
    	}

    	function input1_input_handler() {
    		dme = to_number(this.value);
    		$$invalidate(1, dme);
    	}

    	$$self.$capture_state = () => ({ lme, dme, startLME, startDME });

    	$$self.$inject_state = $$props => {
    		if ("lme" in $$props) $$invalidate(0, lme = $$props.lme);
    		if ("dme" in $$props) $$invalidate(1, dme = $$props.dme);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [lme, dme, startLME, startDME, input0_input_handler, input1_input_handler];
    }

    class LmeDMEcalc extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LmeDMEcalc",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\FtoC.svelte generated by Svelte v3.23.2 */

    const file$4 = "src\\FtoC.svelte";

    function create_fragment$4(ctx) {
    	let div0;
    	let input0;
    	let t0;
    	let p0;
    	let br0;
    	let t2;
    	let div1;
    	let input1;
    	let t3;
    	let p1;
    	let br1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "°F";
    			br0 = element("br");
    			t2 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "°C";
    			br1 = element("br");
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "input1");
    			attr_dev(input0, "name", "input");
    			add_location(input0, file$4, 18, 0, 240);
    			attr_dev(p0, "class", "smallBlack");
    			add_location(p0, file$4, 19, 4, 331);
    			attr_dev(div0, "class", "unit1");
    			add_location(div0, file$4, 17, 0, 219);
    			add_location(br0, file$4, 19, 44, 371);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "input1");
    			attr_dev(input1, "name", "input");
    			add_location(input1, file$4, 22, 0, 400);
    			attr_dev(p1, "class", "smallBlack");
    			add_location(p1, file$4, 23, 4, 491);
    			attr_dev(div1, "class", "unit2");
    			add_location(div1, file$4, 21, 0, 379);
    			add_location(br1, file$4, 23, 45, 532);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, /*F*/ ctx[0]);
    			append_dev(div0, t0);
    			append_dev(div0, p0);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, /*C*/ ctx[1]);
    			append_dev(div1, t3);
    			append_dev(div1, p1);
    			insert_dev(target, br1, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input0, "input", /*convertF*/ ctx[2], false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input1, "input", /*convertC*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*F*/ 1 && to_number(input0.value) !== /*F*/ ctx[0]) {
    				set_input_value(input0, /*F*/ ctx[0]);
    			}

    			if (dirty & /*C*/ 2 && to_number(input1.value) !== /*C*/ ctx[1]) {
    				set_input_value(input1, /*C*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(br1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { F = 60 } = $$props;

    	function convertF() {
    		$$invalidate(1, C = ((F - 32) * 5 / 9).toFixed(3));
    		($$invalidate(1, C), $$invalidate(0, F));
    	}

    	function convertC() {
    		$$invalidate(0, F = (C * 9 / 5 + 32).toFixed(3));
    		$$invalidate(0, F);
    	}

    	const writable_props = ["F"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FtoC> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("FtoC", $$slots, []);

    	function input0_input_handler() {
    		F = to_number(this.value);
    		$$invalidate(0, F);
    	}

    	function input1_input_handler() {
    		C = to_number(this.value);
    		($$invalidate(1, C), $$invalidate(0, F));
    	}

    	$$self.$set = $$props => {
    		if ("F" in $$props) $$invalidate(0, F = $$props.F);
    	};

    	$$self.$capture_state = () => ({ F, convertF, convertC, C });

    	$$self.$inject_state = $$props => {
    		if ("F" in $$props) $$invalidate(0, F = $$props.F);
    		if ("C" in $$props) $$invalidate(1, C = $$props.C);
    	};

    	let C;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*F*/ 1) {
    			 $$invalidate(1, C = ((F - 32) * 5 / 9).toFixed(3));
    		}
    	};

    	return [F, C, convertF, convertC, input0_input_handler, input1_input_handler];
    }

    class FtoC extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { F: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FtoC",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get F() {
    		throw new Error("<FtoC>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set F(value) {
    		throw new Error("<FtoC>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\tempCorrect.svelte generated by Svelte v3.23.2 */
    const file$5 = "src\\tempCorrect.svelte";

    function create_fragment$5(ctx) {
    	let h4;
    	let t1;
    	let label0;
    	let br0;
    	let br1;
    	let t3;
    	let gravityconvert;
    	let updating_standard;
    	let br2;
    	let t4;
    	let label1;
    	let br3;
    	let br4;
    	let t6;
    	let ftoc0;
    	let updating_F;
    	let br5;
    	let t7;
    	let label2;
    	let br6;
    	let t9;
    	let button0;
    	let t11;
    	let button1;
    	let t13;
    	let label3;
    	let br7;
    	let t15;
    	let ftoc1;
    	let updating_F_1;
    	let br8;
    	let t16;
    	let label4;
    	let br9;
    	let br10;
    	let t18;
    	let div0;
    	let span0;
    	let t19;
    	let t20;
    	let span1;
    	let t22;
    	let div1;
    	let span2;
    	let t23;
    	let t24;
    	let span3;
    	let current;
    	let mounted;
    	let dispose;

    	function gravityconvert_standard_binding(value) {
    		/*gravityconvert_standard_binding*/ ctx[7].call(null, value);
    	}

    	let gravityconvert_props = {};

    	if (/*SG*/ ctx[1] !== void 0) {
    		gravityconvert_props.standard = /*SG*/ ctx[1];
    	}

    	gravityconvert = new ConvertGravityComponent({
    			props: gravityconvert_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(gravityconvert, "standard", gravityconvert_standard_binding));

    	function ftoc0_F_binding(value) {
    		/*ftoc0_F_binding*/ ctx[8].call(null, value);
    	}

    	let ftoc0_props = {};

    	if (/*tempF*/ ctx[0] !== void 0) {
    		ftoc0_props.F = /*tempF*/ ctx[0];
    	}

    	ftoc0 = new FtoC({ props: ftoc0_props, $$inline: true });
    	binding_callbacks.push(() => bind(ftoc0, "F", ftoc0_F_binding));

    	function ftoc1_F_binding(value) {
    		/*ftoc1_F_binding*/ ctx[9].call(null, value);
    	}

    	let ftoc1_props = {};

    	if (/*calibrateF*/ ctx[2] !== void 0) {
    		ftoc1_props.F = /*calibrateF*/ ctx[2];
    	}

    	ftoc1 = new FtoC({ props: ftoc1_props, $$inline: true });
    	binding_callbacks.push(() => bind(ftoc1, "F", ftoc1_F_binding));

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Correct Gravity for Temperature";
    			t1 = space();
    			label0 = element("label");
    			label0.textContent = "Gravity:";
    			br0 = element("br");
    			br1 = element("br");
    			t3 = space();
    			create_component(gravityconvert.$$.fragment);
    			br2 = element("br");
    			t4 = space();
    			label1 = element("label");
    			label1.textContent = "Temperature of Liquid:";
    			br3 = element("br");
    			br4 = element("br");
    			t6 = space();
    			create_component(ftoc0.$$.fragment);
    			br5 = element("br");
    			t7 = space();
    			label2 = element("label");
    			label2.textContent = "Calibration Temp of Hydrometer:";
    			br6 = element("br");
    			t9 = space();
    			button0 = element("button");
    			button0.textContent = "60";
    			t11 = space();
    			button1 = element("button");
    			button1.textContent = "68";
    			t13 = space();
    			label3 = element("label");
    			label3.textContent = "Quick Change";
    			br7 = element("br");
    			t15 = space();
    			create_component(ftoc1.$$.fragment);
    			br8 = element("br");
    			t16 = space();
    			label4 = element("label");
    			label4.textContent = "Corrected gravity:";
    			br9 = element("br");
    			br10 = element("br");
    			t18 = space();
    			div0 = element("div");
    			span0 = element("span");
    			t19 = text(/*final*/ ctx[3]);
    			t20 = space();
    			span1 = element("span");
    			span1.textContent = "SPECIFIC GRAVITY";
    			t22 = space();
    			div1 = element("div");
    			span2 = element("span");
    			t23 = text(/*finalPlato*/ ctx[4]);
    			t24 = space();
    			span3 = element("span");
    			span3.textContent = "°P";
    			attr_dev(h4, "class", "mono gray");
    			add_location(h4, file$5, 22, 4, 713);
    			add_location(label0, file$5, 25, 4, 788);
    			add_location(br0, file$5, 25, 27, 811);
    			add_location(br1, file$5, 25, 31, 815);
    			add_location(br2, file$5, 26, 40, 861);
    			add_location(label1, file$5, 28, 4, 873);
    			add_location(br3, file$5, 28, 41, 910);
    			add_location(br4, file$5, 28, 45, 914);
    			add_location(br5, file$5, 29, 26, 946);
    			add_location(label2, file$5, 31, 4, 958);
    			add_location(br6, file$5, 31, 50, 1004);
    			attr_dev(button0, "class", "button");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$5, 32, 4, 1014);
    			attr_dev(button1, "class", "button");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$5, 33, 4, 1085);
    			add_location(label3, file$5, 34, 4, 1157);
    			add_location(br7, file$5, 34, 32, 1185);
    			add_location(br8, file$5, 35, 31, 1222);
    			add_location(label4, file$5, 37, 0, 1230);
    			add_location(br9, file$5, 37, 34, 1264);
    			add_location(br10, file$5, 37, 38, 1268);
    			attr_dev(span0, "class", "answerText");
    			add_location(span0, file$5, 39, 1, 1299);
    			attr_dev(span1, "class", "smallBlack");
    			add_location(span1, file$5, 43, 0, 1362);
    			attr_dev(div0, "class", "answers");
    			add_location(div0, file$5, 38, 0, 1274);
    			attr_dev(span2, "class", "answerText");
    			add_location(span2, file$5, 49, 1, 1454);
    			attr_dev(span3, "class", "smallBlack");
    			add_location(span3, file$5, 53, 0, 1516);
    			attr_dev(div1, "class", "answers2");
    			add_location(div1, file$5, 48, 0, 1428);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, label0, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(gravityconvert, target, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, label1, anchor);
    			insert_dev(target, br3, anchor);
    			insert_dev(target, br4, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(ftoc0, target, anchor);
    			insert_dev(target, br5, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, label2, anchor);
    			insert_dev(target, br6, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, button0, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, button1, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, label3, anchor);
    			insert_dev(target, br7, anchor);
    			insert_dev(target, t15, anchor);
    			mount_component(ftoc1, target, anchor);
    			insert_dev(target, br8, anchor);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, label4, anchor);
    			insert_dev(target, br9, anchor);
    			insert_dev(target, br10, anchor);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, span0);
    			append_dev(span0, t19);
    			append_dev(div0, t20);
    			append_dev(div0, span1);
    			insert_dev(target, t22, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span2);
    			append_dev(span2, t23);
    			append_dev(div1, t24);
    			append_dev(div1, span3);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*cal60*/ ctx[5], false, false, false),
    					listen_dev(button1, "click", /*cal68*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const gravityconvert_changes = {};

    			if (!updating_standard && dirty & /*SG*/ 2) {
    				updating_standard = true;
    				gravityconvert_changes.standard = /*SG*/ ctx[1];
    				add_flush_callback(() => updating_standard = false);
    			}

    			gravityconvert.$set(gravityconvert_changes);
    			const ftoc0_changes = {};

    			if (!updating_F && dirty & /*tempF*/ 1) {
    				updating_F = true;
    				ftoc0_changes.F = /*tempF*/ ctx[0];
    				add_flush_callback(() => updating_F = false);
    			}

    			ftoc0.$set(ftoc0_changes);
    			const ftoc1_changes = {};

    			if (!updating_F_1 && dirty & /*calibrateF*/ 4) {
    				updating_F_1 = true;
    				ftoc1_changes.F = /*calibrateF*/ ctx[2];
    				add_flush_callback(() => updating_F_1 = false);
    			}

    			ftoc1.$set(ftoc1_changes);
    			if (!current || dirty & /*final*/ 8) set_data_dev(t19, /*final*/ ctx[3]);
    			if (!current || dirty & /*finalPlato*/ 16) set_data_dev(t23, /*finalPlato*/ ctx[4]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gravityconvert.$$.fragment, local);
    			transition_in(ftoc0.$$.fragment, local);
    			transition_in(ftoc1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gravityconvert.$$.fragment, local);
    			transition_out(ftoc0.$$.fragment, local);
    			transition_out(ftoc1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(label0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t3);
    			destroy_component(gravityconvert, detaching);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(label1);
    			if (detaching) detach_dev(br3);
    			if (detaching) detach_dev(br4);
    			if (detaching) detach_dev(t6);
    			destroy_component(ftoc0, detaching);
    			if (detaching) detach_dev(br5);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(label2);
    			if (detaching) detach_dev(br6);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(button0);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(button1);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(label3);
    			if (detaching) detach_dev(br7);
    			if (detaching) detach_dev(t15);
    			destroy_component(ftoc1, detaching);
    			if (detaching) detach_dev(br8);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(label4);
    			if (detaching) detach_dev(br9);
    			if (detaching) detach_dev(br10);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t22);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let tempUnit = "F";
    	let gravityUnit = "standard";
    	let tempF = 75;
    	let tempC = 22;
    	let SG = 1.059;
    	let plato = 12;

    	function cal60() {
    		$$invalidate(2, calibrateF = 60);
    		calibrateC = 15.556;
    	}

    	function cal68() {
    		$$invalidate(2, calibrateF = 68);
    		calibrateC = 20;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TempCorrect> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("TempCorrect", $$slots, []);

    	function gravityconvert_standard_binding(value) {
    		SG = value;
    		$$invalidate(1, SG);
    	}

    	function ftoc0_F_binding(value) {
    		tempF = value;
    		$$invalidate(0, tempF);
    	}

    	function ftoc1_F_binding(value) {
    		calibrateF = value;
    		$$invalidate(2, calibrateF);
    	}

    	$$self.$capture_state = () => ({
    		GravityConvert: ConvertGravityComponent,
    		FtoC,
    		tempUnit,
    		gravityUnit,
    		tempF,
    		tempC,
    		SG,
    		plato,
    		cal60,
    		cal68,
    		calibrateF,
    		calibrateC,
    		final,
    		finalPlato
    	});

    	$$self.$inject_state = $$props => {
    		if ("tempUnit" in $$props) tempUnit = $$props.tempUnit;
    		if ("gravityUnit" in $$props) gravityUnit = $$props.gravityUnit;
    		if ("tempF" in $$props) $$invalidate(0, tempF = $$props.tempF);
    		if ("tempC" in $$props) tempC = $$props.tempC;
    		if ("SG" in $$props) $$invalidate(1, SG = $$props.SG);
    		if ("plato" in $$props) plato = $$props.plato;
    		if ("calibrateF" in $$props) $$invalidate(2, calibrateF = $$props.calibrateF);
    		if ("calibrateC" in $$props) calibrateC = $$props.calibrateC;
    		if ("final" in $$props) $$invalidate(3, final = $$props.final);
    		if ("finalPlato" in $$props) $$invalidate(4, finalPlato = $$props.finalPlato);
    	};

    	let calibrateF;
    	let calibrateC;
    	let final;
    	let finalPlato;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*SG, calibrateF, tempF*/ 7) {
    			 $$invalidate(3, final = (SG * ((1.00130346 - 0.000134722124 * calibrateF + 0.00000204052596 * calibrateF - 2.32820948e-9 * calibrateF) / (1.00130346 - 0.000134722124 * tempF + 0.00000204052596 * tempF - 2.32820948e-9 * tempF))).toFixed(5));
    		}

    		if ($$self.$$.dirty & /*final*/ 8) {
    			 $$invalidate(4, finalPlato = (259 - 259 / final).toFixed(5));
    		}
    	};

    	 $$invalidate(2, calibrateF = 60);
    	 calibrateC = 15.556;

    	return [
    		tempF,
    		SG,
    		calibrateF,
    		final,
    		finalPlato,
    		cal60,
    		cal68,
    		gravityconvert_standard_binding,
    		ftoc0_F_binding,
    		ftoc1_F_binding
    	];
    }

    class TempCorrect extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TempCorrect",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\FtoCApp.svelte generated by Svelte v3.23.2 */
    const file$6 = "src\\FtoCApp.svelte";

    function create_fragment$6(ctx) {
    	let h4;
    	let t1;
    	let ftoc;
    	let current;
    	ftoc = new FtoC({ $$inline: true });

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Temperature Unit Converter";
    			t1 = space();
    			create_component(ftoc.$$.fragment);
    			attr_dev(h4, "class", "mono gray");
    			add_location(h4, file$6, 6, 4, 66);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(ftoc, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ftoc.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ftoc.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			destroy_component(ftoc, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FtoCApp> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("FtoCApp", $$slots, []);
    	$$self.$capture_state = () => ({ FtoC });
    	return [];
    }

    class FtoCApp extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FtoCApp",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\convertLbsToKgs.svelte generated by Svelte v3.23.2 */

    const file$7 = "src\\convertLbsToKgs.svelte";

    function create_fragment$7(ctx) {
    	let br0;
    	let div0;
    	let input0;
    	let t0;
    	let p0;
    	let t2;
    	let br1;
    	let t3;
    	let div1;
    	let input1;
    	let t4;
    	let p1;
    	let br2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "Lbs";
    			t2 = space();
    			br1 = element("br");
    			t3 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "kg";
    			br2 = element("br");
    			add_location(br0, file$7, 19, 0, 255);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "input1");
    			attr_dev(input0, "name", "input");
    			add_location(input0, file$7, 20, 0, 280);
    			attr_dev(p0, "class", "smallBlack");
    			add_location(p0, file$7, 21, 4, 375);
    			attr_dev(div0, "class", "unit1");
    			add_location(div0, file$7, 19, 4, 259);
    			add_location(br1, file$7, 22, 6, 414);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "input1");
    			attr_dev(input1, "name", "input");
    			add_location(input1, file$7, 25, 0, 443);
    			attr_dev(p1, "class", "smallBlack");
    			add_location(p1, file$7, 26, 4, 536);
    			attr_dev(div1, "class", "unit2");
    			add_location(div1, file$7, 24, 0, 422);
    			add_location(br2, file$7, 26, 41, 573);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, /*lbs*/ ctx[0]);
    			append_dev(div0, t0);
    			append_dev(div0, p0);
    			append_dev(div0, t2);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, /*kg*/ ctx[1]);
    			append_dev(div1, t4);
    			append_dev(div1, p1);
    			insert_dev(target, br2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input0, "input", /*convertLbs*/ ctx[2], false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input1, "input", /*convertKg*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*lbs*/ 1 && to_number(input0.value) !== /*lbs*/ ctx[0]) {
    				set_input_value(input0, /*lbs*/ ctx[0]);
    			}

    			if (dirty & /*kg*/ 2 && to_number(input1.value) !== /*kg*/ ctx[1]) {
    				set_input_value(input1, /*kg*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(br2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { lbs = 12 } = $$props;
    	let kg = (0.45359237 * lbs).toFixed(2);

    	function convertLbs() {
    		$$invalidate(1, kg = (0.45359237 * lbs).toFixed(2));
    		$$invalidate(1, kg);
    	}

    	function convertKg() {
    		$$invalidate(0, lbs = (2.20462262185 * kg).toFixed(2));
    		$$invalidate(0, lbs);
    	}

    	const writable_props = ["lbs"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ConvertLbsToKgs> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ConvertLbsToKgs", $$slots, []);

    	function input0_input_handler() {
    		lbs = to_number(this.value);
    		$$invalidate(0, lbs);
    	}

    	function input1_input_handler() {
    		kg = to_number(this.value);
    		$$invalidate(1, kg);
    	}

    	$$self.$set = $$props => {
    		if ("lbs" in $$props) $$invalidate(0, lbs = $$props.lbs);
    	};

    	$$self.$capture_state = () => ({ lbs, kg, convertLbs, convertKg });

    	$$self.$inject_state = $$props => {
    		if ("lbs" in $$props) $$invalidate(0, lbs = $$props.lbs);
    		if ("kg" in $$props) $$invalidate(1, kg = $$props.kg);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [lbs, kg, convertLbs, convertKg, input0_input_handler, input1_input_handler];
    }

    class ConvertLbsToKgs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { lbs: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConvertLbsToKgs",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get lbs() {
    		throw new Error("<ConvertLbsToKgs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lbs(value) {
    		throw new Error("<ConvertLbsToKgs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\convertQPPtoPPP.svelte generated by Svelte v3.23.2 */

    const file$8 = "src\\convertQPPtoPPP.svelte";

    function create_fragment$8(ctx) {
    	let br0;
    	let div0;
    	let input0;
    	let t0;
    	let p0;
    	let t2;
    	let br1;
    	let t3;
    	let div1;
    	let input1;
    	let t4;
    	let p1;
    	let br2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			br0 = element("br");
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "Quarts per Lb";
    			t2 = space();
    			br1 = element("br");
    			t3 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "Lbs per Lb or kgs per kg";
    			br2 = element("br");
    			add_location(br0, file$8, 20, 0, 352);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "input1");
    			attr_dev(input0, "name", "input");
    			add_location(input0, file$8, 21, 0, 377);
    			attr_dev(p0, "class", "smallBlack");
    			add_location(p0, file$8, 22, 4, 483);
    			attr_dev(div0, "class", "unit1");
    			add_location(div0, file$8, 20, 4, 356);
    			add_location(br1, file$8, 23, 6, 532);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "class", "input1");
    			attr_dev(input1, "name", "input");
    			add_location(input1, file$8, 26, 0, 561);
    			attr_dev(p1, "class", "XsmallBlack");
    			add_location(p1, file$8, 27, 4, 662);
    			attr_dev(div1, "class", "unit2");
    			add_location(div1, file$8, 25, 0, 540);
    			add_location(br2, file$8, 27, 64, 722);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br0, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, /*quartsPerPound*/ ctx[0]);
    			append_dev(div0, t0);
    			append_dev(div0, p0);
    			append_dev(div0, t2);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, /*lbsPerLbs*/ ctx[1]);
    			append_dev(div1, t4);
    			append_dev(div1, p1);
    			insert_dev(target, br2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input0, "input", /*convertQPP*/ ctx[2], false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input1, "input", /*convertPPP*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*quartsPerPound*/ 1 && to_number(input0.value) !== /*quartsPerPound*/ ctx[0]) {
    				set_input_value(input0, /*quartsPerPound*/ ctx[0]);
    			}

    			if (dirty & /*lbsPerLbs*/ 2 && to_number(input1.value) !== /*lbsPerLbs*/ ctx[1]) {
    				set_input_value(input1, /*lbsPerLbs*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(br2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { quartsPerPound = 1.25 } = $$props;
    	let lbsPerLbs = (quartsPerPound * 2.086375).toFixed(2);

    	function convertQPP() {
    		$$invalidate(1, lbsPerLbs = (quartsPerPound * 2.086375).toFixed(2));
    		$$invalidate(1, lbsPerLbs);
    	}

    	function convertPPP() {
    		$$invalidate(0, quartsPerPound = (lbsPerLbs / 2.086375).toFixed(2));
    		$$invalidate(0, quartsPerPound);
    	}

    	const writable_props = ["quartsPerPound"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ConvertQPPtoPPP> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ConvertQPPtoPPP", $$slots, []);

    	function input0_input_handler() {
    		quartsPerPound = to_number(this.value);
    		$$invalidate(0, quartsPerPound);
    	}

    	function input1_input_handler() {
    		lbsPerLbs = to_number(this.value);
    		$$invalidate(1, lbsPerLbs);
    	}

    	$$self.$set = $$props => {
    		if ("quartsPerPound" in $$props) $$invalidate(0, quartsPerPound = $$props.quartsPerPound);
    	};

    	$$self.$capture_state = () => ({
    		quartsPerPound,
    		lbsPerLbs,
    		convertQPP,
    		convertPPP
    	});

    	$$self.$inject_state = $$props => {
    		if ("quartsPerPound" in $$props) $$invalidate(0, quartsPerPound = $$props.quartsPerPound);
    		if ("lbsPerLbs" in $$props) $$invalidate(1, lbsPerLbs = $$props.lbsPerLbs);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		quartsPerPound,
    		lbsPerLbs,
    		convertQPP,
    		convertPPP,
    		input0_input_handler,
    		input1_input_handler
    	];
    }

    class ConvertQPPtoPPP extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { quartsPerPound: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConvertQPPtoPPP",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get quartsPerPound() {
    		throw new Error("<ConvertQPPtoPPP>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set quartsPerPound(value) {
    		throw new Error("<ConvertQPPtoPPP>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\strikeWaterCalculator.svelte generated by Svelte v3.23.2 */
    const file$9 = "src\\strikeWaterCalculator.svelte";

    function create_fragment$9(ctx) {
    	let h4;
    	let t1;
    	let label0;
    	let br0;
    	let t3;
    	let mass;
    	let updating_lbs;
    	let br1;
    	let t4;
    	let label1;
    	let br2;
    	let t6;
    	let qtop;
    	let updating_quarts;
    	let br3;
    	let t7;
    	let label2;
    	let br4;
    	let t9;
    	let ftoc0;
    	let updating_F;
    	let br5;
    	let t10;
    	let label3;
    	let br6;
    	let t12;
    	let ftoc1;
    	let updating_F_1;
    	let t13;
    	let br7;
    	let t14;
    	let label4;
    	let br8;
    	let br9;
    	let t16;
    	let div0;
    	let span1;
    	let t17_value = (/*weight*/ ctx[0] * /*ratio*/ ctx[1] / 4).toFixed(2) + "";
    	let t17;
    	let span0;
    	let br10;
    	let t19;
    	let div1;
    	let span3;
    	let t20_value = (/*weight*/ ctx[0] * /*ratio*/ ctx[1] * 0.946353).toFixed(2) + "";
    	let t20;
    	let span2;
    	let br11;
    	let t22;
    	let br12;
    	let br13;
    	let t23;
    	let label5;
    	let t25;
    	let br14;
    	let t26;
    	let br15;
    	let t27;
    	let div2;
    	let span5;
    	let t28_value = (0.2 / /*ratio*/ ctx[1] * (/*targetTemp*/ ctx[3] - /*grainTemp*/ ctx[2]) + /*targetTemp*/ ctx[3]).toFixed(2) + "";
    	let t28;
    	let span4;
    	let br16;
    	let t30;
    	let div3;
    	let span7;
    	let t31_value = ((0.2 / /*ratio*/ ctx[1] * (/*targetTemp*/ ctx[3] - /*grainTemp*/ ctx[2]) + /*targetTemp*/ ctx[3] - 32) * 5 / 9).toFixed(2) + "";
    	let t31;
    	let span6;
    	let br17;
    	let t33;
    	let p;
    	let span8;
    	let t35;
    	let current;

    	function mass_lbs_binding(value) {
    		/*mass_lbs_binding*/ ctx[4].call(null, value);
    	}

    	let mass_props = {};

    	if (/*weight*/ ctx[0] !== void 0) {
    		mass_props.lbs = /*weight*/ ctx[0];
    	}

    	mass = new ConvertLbsToKgs({ props: mass_props, $$inline: true });
    	binding_callbacks.push(() => bind(mass, "lbs", mass_lbs_binding));

    	function qtop_quarts_binding(value) {
    		/*qtop_quarts_binding*/ ctx[5].call(null, value);
    	}

    	let qtop_props = {};

    	if (/*ratio*/ ctx[1] !== void 0) {
    		qtop_props.quarts = /*ratio*/ ctx[1];
    	}

    	qtop = new ConvertQPPtoPPP({ props: qtop_props, $$inline: true });
    	binding_callbacks.push(() => bind(qtop, "quarts", qtop_quarts_binding));

    	function ftoc0_F_binding(value) {
    		/*ftoc0_F_binding*/ ctx[6].call(null, value);
    	}

    	let ftoc0_props = {};

    	if (/*grainTemp*/ ctx[2] !== void 0) {
    		ftoc0_props.F = /*grainTemp*/ ctx[2];
    	}

    	ftoc0 = new FtoC({ props: ftoc0_props, $$inline: true });
    	binding_callbacks.push(() => bind(ftoc0, "F", ftoc0_F_binding));

    	function ftoc1_F_binding(value) {
    		/*ftoc1_F_binding*/ ctx[7].call(null, value);
    	}

    	let ftoc1_props = {};

    	if (/*targetTemp*/ ctx[3] !== void 0) {
    		ftoc1_props.F = /*targetTemp*/ ctx[3];
    	}

    	ftoc1 = new FtoC({ props: ftoc1_props, $$inline: true });
    	binding_callbacks.push(() => bind(ftoc1, "F", ftoc1_F_binding));

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Strike Water Calculator";
    			t1 = space();
    			label0 = element("label");
    			label0.textContent = "Grain Weight:";
    			br0 = element("br");
    			t3 = space();
    			create_component(mass.$$.fragment);
    			br1 = element("br");
    			t4 = space();
    			label1 = element("label");
    			label1.textContent = "Water to Grain Ratio: ";
    			br2 = element("br");
    			t6 = space();
    			create_component(qtop.$$.fragment);
    			br3 = element("br");
    			t7 = space();
    			label2 = element("label");
    			label2.textContent = "Grain Temperature:";
    			br4 = element("br");
    			t9 = space();
    			create_component(ftoc0.$$.fragment);
    			br5 = element("br");
    			t10 = space();
    			label3 = element("label");
    			label3.textContent = "Desired Mash Temp: ";
    			br6 = element("br");
    			t12 = space();
    			create_component(ftoc1.$$.fragment);
    			t13 = space();
    			br7 = element("br");
    			t14 = space();
    			label4 = element("label");
    			label4.textContent = "Volume of Water to Use: ";
    			br8 = element("br");
    			br9 = element("br");
    			t16 = space();
    			div0 = element("div");
    			span1 = element("span");
    			t17 = text(t17_value);
    			span0 = element("span");
    			span0.textContent = "Gallons of Water";
    			br10 = element("br");
    			t19 = space();
    			div1 = element("div");
    			span3 = element("span");
    			t20 = text(t20_value);
    			span2 = element("span");
    			span2.textContent = "Liters of Water";
    			br11 = element("br");
    			t22 = space();
    			br12 = element("br");
    			br13 = element("br");
    			t23 = space();
    			label5 = element("label");
    			label5.textContent = "Strike Temperature:";
    			t25 = space();
    			br14 = element("br");
    			t26 = space();
    			br15 = element("br");
    			t27 = space();
    			div2 = element("div");
    			span5 = element("span");
    			t28 = text(t28_value);
    			span4 = element("span");
    			span4.textContent = "°F";
    			br16 = element("br");
    			t30 = space();
    			div3 = element("div");
    			span7 = element("span");
    			t31 = text(t31_value);
    			span6 = element("span");
    			span6.textContent = "°C";
    			br17 = element("br");
    			t33 = space();
    			p = element("p");
    			span8 = element("span");
    			span8.textContent = "Note:";
    			t35 = text(" Basic Calculation. Does not factor in mash tun temperature.");
    			attr_dev(h4, "class", "mono gray");
    			add_location(h4, file$9, 19, 0, 250);
    			add_location(label0, file$9, 22, 0, 306);
    			add_location(br0, file$9, 22, 28, 334);
    			add_location(br1, file$9, 23, 25, 365);
    			add_location(label1, file$9, 25, 0, 373);
    			add_location(br2, file$9, 25, 37, 410);
    			add_location(br3, file$9, 26, 27, 443);
    			add_location(label2, file$9, 28, 0, 451);
    			add_location(br4, file$9, 28, 33, 484);
    			add_location(br5, file$9, 29, 26, 516);
    			add_location(label3, file$9, 31, 0, 524);
    			add_location(br6, file$9, 31, 34, 558);
    			add_location(br7, file$9, 32, 28, 592);
    			add_location(label4, file$9, 35, 0, 602);
    			add_location(br8, file$9, 35, 39, 641);
    			add_location(br9, file$9, 35, 43, 645);
    			attr_dev(span0, "class", "smallBlack");
    			add_location(span0, file$9, 40, 60, 740);
    			attr_dev(span1, "class", "answerText");
    			add_location(span1, file$9, 40, 4, 684);
    			add_location(br10, file$9, 40, 115, 795);
    			attr_dev(div0, "class", "answers");
    			add_location(div0, file$9, 37, 0, 653);
    			attr_dev(span2, "class", "smallBlack");
    			add_location(span2, file$9, 47, 69, 910);
    			attr_dev(span3, "class", "answerText");
    			add_location(span3, file$9, 47, 4, 845);
    			add_location(br11, file$9, 47, 123, 964);
    			attr_dev(div1, "class", "answers2");
    			add_location(div1, file$9, 44, 0, 813);
    			add_location(br12, file$9, 49, 6, 978);
    			add_location(br13, file$9, 49, 10, 982);
    			add_location(label5, file$9, 52, 0, 992);
    			add_location(br14, file$9, 53, 0, 1029);
    			add_location(br15, file$9, 54, 0, 1035);
    			attr_dev(span4, "class", "smallBlack");
    			add_location(span4, file$9, 60, 92, 1164);
    			attr_dev(span5, "class", "answerText");
    			add_location(span5, file$9, 60, 4, 1076);
    			add_location(br16, file$9, 60, 137, 1209);
    			attr_dev(div2, "class", "answers");
    			add_location(div2, file$9, 57, 0, 1045);
    			attr_dev(span6, "class", "smallBlack");
    			add_location(span6, file$9, 68, 109, 1366);
    			attr_dev(span7, "class", "answerText");
    			add_location(span7, file$9, 68, 4, 1261);
    			add_location(br17, file$9, 68, 154, 1411);
    			attr_dev(div3, "class", "answers2");
    			add_location(div3, file$9, 65, 0, 1229);
    			attr_dev(span8, "class", "medium green");
    			add_location(span8, file$9, 73, 7, 1442);
    			add_location(p, file$9, 73, 4, 1439);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, label0, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(mass, target, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, label1, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(qtop, target, anchor);
    			insert_dev(target, br3, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, label2, anchor);
    			insert_dev(target, br4, anchor);
    			insert_dev(target, t9, anchor);
    			mount_component(ftoc0, target, anchor);
    			insert_dev(target, br5, anchor);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, label3, anchor);
    			insert_dev(target, br6, anchor);
    			insert_dev(target, t12, anchor);
    			mount_component(ftoc1, target, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, br7, anchor);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, label4, anchor);
    			insert_dev(target, br8, anchor);
    			insert_dev(target, br9, anchor);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, span1);
    			append_dev(span1, t17);
    			append_dev(span1, span0);
    			append_dev(div0, br10);
    			insert_dev(target, t19, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span3);
    			append_dev(span3, t20);
    			append_dev(span3, span2);
    			append_dev(div1, br11);
    			append_dev(div1, t22);
    			insert_dev(target, br12, anchor);
    			insert_dev(target, br13, anchor);
    			insert_dev(target, t23, anchor);
    			insert_dev(target, label5, anchor);
    			insert_dev(target, t25, anchor);
    			insert_dev(target, br14, anchor);
    			insert_dev(target, t26, anchor);
    			insert_dev(target, br15, anchor);
    			insert_dev(target, t27, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, span5);
    			append_dev(span5, t28);
    			append_dev(span5, span4);
    			append_dev(div2, br16);
    			insert_dev(target, t30, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, span7);
    			append_dev(span7, t31);
    			append_dev(span7, span6);
    			append_dev(div3, br17);
    			insert_dev(target, t33, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, span8);
    			append_dev(p, t35);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const mass_changes = {};

    			if (!updating_lbs && dirty & /*weight*/ 1) {
    				updating_lbs = true;
    				mass_changes.lbs = /*weight*/ ctx[0];
    				add_flush_callback(() => updating_lbs = false);
    			}

    			mass.$set(mass_changes);
    			const qtop_changes = {};

    			if (!updating_quarts && dirty & /*ratio*/ 2) {
    				updating_quarts = true;
    				qtop_changes.quarts = /*ratio*/ ctx[1];
    				add_flush_callback(() => updating_quarts = false);
    			}

    			qtop.$set(qtop_changes);
    			const ftoc0_changes = {};

    			if (!updating_F && dirty & /*grainTemp*/ 4) {
    				updating_F = true;
    				ftoc0_changes.F = /*grainTemp*/ ctx[2];
    				add_flush_callback(() => updating_F = false);
    			}

    			ftoc0.$set(ftoc0_changes);
    			const ftoc1_changes = {};

    			if (!updating_F_1 && dirty & /*targetTemp*/ 8) {
    				updating_F_1 = true;
    				ftoc1_changes.F = /*targetTemp*/ ctx[3];
    				add_flush_callback(() => updating_F_1 = false);
    			}

    			ftoc1.$set(ftoc1_changes);
    			if ((!current || dirty & /*weight, ratio*/ 3) && t17_value !== (t17_value = (/*weight*/ ctx[0] * /*ratio*/ ctx[1] / 4).toFixed(2) + "")) set_data_dev(t17, t17_value);
    			if ((!current || dirty & /*weight, ratio*/ 3) && t20_value !== (t20_value = (/*weight*/ ctx[0] * /*ratio*/ ctx[1] * 0.946353).toFixed(2) + "")) set_data_dev(t20, t20_value);
    			if ((!current || dirty & /*ratio, targetTemp, grainTemp*/ 14) && t28_value !== (t28_value = (0.2 / /*ratio*/ ctx[1] * (/*targetTemp*/ ctx[3] - /*grainTemp*/ ctx[2]) + /*targetTemp*/ ctx[3]).toFixed(2) + "")) set_data_dev(t28, t28_value);
    			if ((!current || dirty & /*ratio, targetTemp, grainTemp*/ 14) && t31_value !== (t31_value = ((0.2 / /*ratio*/ ctx[1] * (/*targetTemp*/ ctx[3] - /*grainTemp*/ ctx[2]) + /*targetTemp*/ ctx[3] - 32) * 5 / 9).toFixed(2) + "")) set_data_dev(t31, t31_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mass.$$.fragment, local);
    			transition_in(qtop.$$.fragment, local);
    			transition_in(ftoc0.$$.fragment, local);
    			transition_in(ftoc1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mass.$$.fragment, local);
    			transition_out(qtop.$$.fragment, local);
    			transition_out(ftoc0.$$.fragment, local);
    			transition_out(ftoc1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(label0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t3);
    			destroy_component(mass, detaching);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(label1);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t6);
    			destroy_component(qtop, detaching);
    			if (detaching) detach_dev(br3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(label2);
    			if (detaching) detach_dev(br4);
    			if (detaching) detach_dev(t9);
    			destroy_component(ftoc0, detaching);
    			if (detaching) detach_dev(br5);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(label3);
    			if (detaching) detach_dev(br6);
    			if (detaching) detach_dev(t12);
    			destroy_component(ftoc1, detaching);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(br7);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(label4);
    			if (detaching) detach_dev(br8);
    			if (detaching) detach_dev(br9);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t19);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(br12);
    			if (detaching) detach_dev(br13);
    			if (detaching) detach_dev(t23);
    			if (detaching) detach_dev(label5);
    			if (detaching) detach_dev(t25);
    			if (detaching) detach_dev(br14);
    			if (detaching) detach_dev(t26);
    			if (detaching) detach_dev(br15);
    			if (detaching) detach_dev(t27);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t30);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t33);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let weight = 12;
    	let ratio = 1.25;
    	let grainTemp = 65;
    	let targetTemp = 153;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<StrikeWaterCalculator> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("StrikeWaterCalculator", $$slots, []);

    	function mass_lbs_binding(value) {
    		weight = value;
    		$$invalidate(0, weight);
    	}

    	function qtop_quarts_binding(value) {
    		ratio = value;
    		$$invalidate(1, ratio);
    	}

    	function ftoc0_F_binding(value) {
    		grainTemp = value;
    		$$invalidate(2, grainTemp);
    	}

    	function ftoc1_F_binding(value) {
    		targetTemp = value;
    		$$invalidate(3, targetTemp);
    	}

    	$$self.$capture_state = () => ({
    		Mass: ConvertLbsToKgs,
    		QtoP: ConvertQPPtoPPP,
    		FtoC,
    		weight,
    		ratio,
    		grainTemp,
    		targetTemp
    	});

    	$$self.$inject_state = $$props => {
    		if ("weight" in $$props) $$invalidate(0, weight = $$props.weight);
    		if ("ratio" in $$props) $$invalidate(1, ratio = $$props.ratio);
    		if ("grainTemp" in $$props) $$invalidate(2, grainTemp = $$props.grainTemp);
    		if ("targetTemp" in $$props) $$invalidate(3, targetTemp = $$props.targetTemp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		weight,
    		ratio,
    		grainTemp,
    		targetTemp,
    		mass_lbs_binding,
    		qtop_quarts_binding,
    		ftoc0_F_binding,
    		ftoc1_F_binding
    	];
    }

    class StrikeWaterCalculator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StrikeWaterCalculator",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.23.2 */

    const { console: console_1 } = globals;
    const file$a = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (56:4) {#each apps as app, i}
    function create_each_block(ctx) {
    	let div;
    	let button;
    	let t1;
    	let switch_instance;
    	let current;
    	let mounted;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[4](/*i*/ ctx[9], ...args);
    	}

    	var switch_value = /*app*/ ctx[7];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			button.textContent = "✖️";
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(button, "class", "exit");
    			add_location(button, file$a, 58, 6, 1565);
    			attr_dev(div, "class", "calculator");
    			add_location(div, file$a, 56, 4, 1527);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(div, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (switch_value !== (switch_value = /*app*/ ctx[7])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance) destroy_component(switch_instance);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(56:4) {#each apps as app, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let link;
    	let t0;
    	let main;
    	let h1;
    	let span0;
    	let span1;
    	let t3;
    	let img;
    	let img_src_value;
    	let t4;
    	let h3;
    	let t6;
    	let div1;
    	let t7;
    	let div0;
    	let p;
    	let t9;
    	let select;
    	let option0;
    	let t10;
    	let option1;
    	let t11;
    	let option2;
    	let t12;
    	let option3;
    	let t13;
    	let option4;
    	let t14;
    	let option5;
    	let t15;
    	let t16;
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*apps*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			main = element("main");
    			h1 = element("h1");
    			span0 = element("span");
    			span0.textContent = "drink";
    			span1 = element("span");
    			span1.textContent = "SQUIRREL";
    			t3 = space();
    			img = element("img");
    			t4 = space();
    			h3 = element("h3");
    			h3.textContent = "calculator apps";
    			t6 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t7 = space();
    			div0 = element("div");
    			p = element("p");
    			p.textContent = "Add an App:";
    			t9 = space();
    			select = element("select");
    			option0 = element("option");
    			t10 = text("ABV Calculator");
    			option1 = element("option");
    			t11 = text("Strike Water Calculator");
    			option2 = element("option");
    			t12 = text("Convert Gravity Units");
    			option3 = element("option");
    			t13 = text("Convert Between LME and DME");
    			option4 = element("option");
    			t14 = text("Correct Hydrometer for Temperature");
    			option5 = element("option");
    			t15 = text("Temperature Conversion");
    			t16 = space();
    			button = element("button");
    			button.textContent = "Add App";
    			document.title = "drinkSquirrel";
    			attr_dev(link, "href", "https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@200;600;900&family=DM+Mono:ital,wght@1,300&display=swap");
    			attr_dev(link, "rel", "stylesheet");
    			add_location(link, file$a, 31, 1, 663);
    			attr_dev(span0, "class", "green svelte-13tvwy1");
    			add_location(span0, file$a, 44, 52, 1181);
    			attr_dev(span1, "class", "black orange svelte-13tvwy1");
    			add_location(span1, file$a, 44, 84, 1213);
    			attr_dev(h1, "class", "light svelte-13tvwy1");
    			set_style(h1, "display", "inline-block");
    			add_location(h1, file$a, 44, 2, 1131);
    			if (img.src !== (img_src_value = "squirrel2.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			set_style(img, "width", "60px");
    			set_style(img, "display", "inline-block");
    			set_style(img, "position", "relative");
    			set_style(img, "top", "10px");
    			set_style(img, "right", "10px");
    			add_location(img, file$a, 45, 1, 1263);
    			attr_dev(h3, "class", "mono center svelte-13tvwy1");
    			add_location(h3, file$a, 48, 3, 1393);
    			attr_dev(p, "class", "mono center svelte-13tvwy1");
    			add_location(p, file$a, 66, 12, 1722);
    			option0.__value = AbvCalculator;
    			option0.value = option0.__value;
    			add_location(option0, file$a, 69, 8, 1839);
    			option1.__value = StrikeWaterCalculator;
    			option1.value = option1.__value;
    			add_location(option1, file$a, 70, 8, 1896);
    			option2.__value = ConvertApp;
    			option2.value = option2.__value;
    			add_location(option2, file$a, 71, 8, 1961);
    			option3.__value = LmeDMEcalc;
    			option3.value = option3.__value;
    			add_location(option3, file$a, 72, 8, 2025);
    			option4.__value = TempCorrect;
    			option4.value = option4.__value;
    			add_location(option4, file$a, 73, 8, 2094);
    			option5.__value = FtoCApp;
    			option5.value = option5.__value;
    			add_location(option5, file$a, 74, 8, 2175);
    			attr_dev(select, "name", "whichApp");
    			attr_dev(select, "id", "whichApp");
    			if (/*choiceIn*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[5].call(select));
    			add_location(select, file$a, 68, 6, 1768);
    			attr_dev(button, "class", "submit svelte-13tvwy1");
    			attr_dev(button, "type", "submit");
    			add_location(button, file$a, 78, 6, 2265);
    			add_location(div0, file$a, 65, 4, 1704);
    			attr_dev(div1, "class", "grid-container");
    			attr_dev(div1, "id", "gridContainer");
    			add_location(div1, file$a, 52, 2, 1445);
    			add_location(main, file$a, 34, 0, 834);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(h1, span0);
    			append_dev(h1, span1);
    			append_dev(main, t3);
    			append_dev(main, img);
    			append_dev(main, t4);
    			append_dev(main, h3);
    			append_dev(main, t6);
    			append_dev(main, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t7);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(div0, t9);
    			append_dev(div0, select);
    			append_dev(select, option0);
    			append_dev(option0, t10);
    			append_dev(select, option1);
    			append_dev(option1, t11);
    			append_dev(select, option2);
    			append_dev(option2, t12);
    			append_dev(select, option3);
    			append_dev(option3, t13);
    			append_dev(select, option4);
    			append_dev(option4, t14);
    			append_dev(select, option5);
    			append_dev(option5, t15);
    			select_option(select, /*choiceIn*/ ctx[1]);
    			append_dev(div0, t16);
    			append_dev(div0, button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[5]),
    					listen_dev(button, "click", /*addApp*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*apps, removeApp*/ 9) {
    				each_value = /*apps*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, t7);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*choiceIn, FtoC, TempCorrect, LMEdme, Convert, Strike, AbvCalc*/ 2) {
    				select_option(select, /*choiceIn*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let apps = [AbvCalculator, TempCorrect, StrikeWaterCalculator, ConvertApp, LmeDMEcalc, FtoCApp];
    	let choiceIn = AbvCalculator;
    	let appIndex = 0;

    	function addApp() {
    		apps.push(choiceIn);
    		$$invalidate(0, apps);
    		console.log(apps.length);
    	}

    	function removeApp(i) {
    		apps.splice(i, 1);
    		console.log(apps.length);
    		$$invalidate(0, apps);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	const click_handler = i => removeApp(i);

    	function select_change_handler() {
    		choiceIn = select_value(this);
    		$$invalidate(1, choiceIn);
    	}

    	$$self.$capture_state = () => ({
    		AbvCalc: AbvCalculator,
    		Convert: ConvertApp,
    		LMEdme: LmeDMEcalc,
    		TempCorrect,
    		FtoC: FtoCApp,
    		Strike: StrikeWaterCalculator,
    		apps,
    		choiceIn,
    		appIndex,
    		addApp,
    		removeApp
    	});

    	$$self.$inject_state = $$props => {
    		if ("apps" in $$props) $$invalidate(0, apps = $$props.apps);
    		if ("choiceIn" in $$props) $$invalidate(1, choiceIn = $$props.choiceIn);
    		if ("appIndex" in $$props) appIndex = $$props.appIndex;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [apps, choiceIn, addApp, removeApp, click_handler, select_change_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
