<?php
/**
 * @license see LICENSE
 */

namespace Serps\Core\Dom;

use DOMNodeList as BaseDomNodeList;

/**
 * @property int $length
 */
class DomNodeList implements \Countable, \Iterator
{

    /**
     * @var BaseDomNodeList
     */
    protected $nodeList;
    protected $documentWrapper;
    protected $itCur = 0;

    public function __construct(BaseDomNodeList $list, DocumentWrapper $doc)
    {
        $this->nodeList = $list;
        $this->documentWrapper = $doc;
    }

    /**
     * Check if at least one of the elements in the collection as the given class
     * @param $className
     * @return bool
     */
    public function hasClass($className)
    {
        for ($i = 0; $i < $this->nodeList->length; $i++) {
            if ($this->getNodeAt($i)->hasClass($className)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if at least one of the elements in the collection as all the given classes
     * @param $className
     * @return bool
     */
    public function hasClasses(array $classNames)
    {
        for ($i = 0; $i < $this->nodeList->length; $i++) {
            if ($this->getNodeAt($i)->hasClasses($classNames)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if at least one of the elements in the collection as one of the given classes
     * @param $className
     * @return bool
     */
    public function hasAnyClass(array $classNames)
    {
        for ($i = 0; $i < $this->nodeList->length; $i++) {
            if ($this->getNodeAt($i)->hasAnyClass($classNames)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param $index
     * @return DomNodeInterface|null
     */
    public function item($index)
    {
        $item = $this->nodeList->item($index);

        if (!$item) {
            return null;
        }

        if (!$item instanceof DomNodeInterface) {
            return new OtherDomNode($item);
        }

        return $item;
    }

    /**
     * This is almost the same as item() method but while item() might return null if an element does not exist this
     * method will always return a valid object
     * @param $index
     * @return DomNodeInterface
     */
    public function getNodeAt($index)
    {
        $item = $this->nodeList->item($index);

        if (!$item) {
            return new NullDomNode();
        }

        if (!$item instanceof DomNodeInterface) {
            return new OtherDomNode($item);
        }

        return $item;
    }

    public function __get($name)
    {
        if ($name === 'length') {
            return $this->count();
        }
    }

    public function count()
    {
        return $this->nodeList->length;
    }


    public function current()
    {
        return $this->nodeList->item($this->itCur);
    }

    public function next()
    {
        $this->itCur++;
    }

    public function key()
    {
        return $this->itCur;
    }

    public function valid()
    {
        return $this->itCur < $this->count();
    }

    public function rewind()
    {
        $this->itCur = 0;
    }
}
